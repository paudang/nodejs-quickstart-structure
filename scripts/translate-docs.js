import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../docs');
const TARGET_LANGS = ['vi', 'zh'];

// Helper to get all markdown files in docs recursively
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    // Ignore .vitepress, public, node_modules, and already localized folders
    if (['.vitepress', 'public', 'node_modules', 'vi', 'zh'].includes(file)) {
      continue;
    }
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (path.extname(file) === '.md' && file !== 'index.md') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function googleTranslate(text, targetLang) {
  const tl = targetLang === 'zh' ? 'zh-CN' : targetLang;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ q: text })
  });
  
  if (!response.ok) {
    throw new Error(`Google Translate HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  if (!data || !data[0]) {
    throw new Error('Invalid response from Google Translate');
  }
  
  return data[0].map(x => x[0]).join('');
}

async function translateContent(content, lang) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  if (apiKey) {
    console.log(`[AI Engine] Translating file to ${lang} via Gemini...`);
    try {
      if (process.env.GEMINI_API_KEY) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert technical translator. Translate the following documentation markdown into ${lang === 'vi' ? 'Vietnamese' : 'Simplified Chinese'}. Preserve all markdown syntax, code blocks, frontmatter, links, and VitePress specific tags (like badges, containers, etc):\n\n${content}`
              }]
            }]
          })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
      }
    } catch (err) {
      console.error(`Failed to translate using API:`, err.message);
    }
  }

  // Fallback to Google Translate
  console.log(`[Google Translate Fallback] Translating file to ${lang}...`);
  try {
    // 1. Protect code blocks
    const codeBlocks = [];
    let placeholderIndex = 0;
    let processed = content.replace(/```[\s\S]*?```/g, (match) => {
      const placeholder = `%%CODE_BLOCK_${placeholderIndex++}%%`;
      codeBlocks.push({ placeholder, original: match });
      return placeholder;
    });

    // 2. Protect inline code
    const inlineCodes = [];
    let inlineIndex = 0;
    processed = processed.replace(/`[^`\n]+`/g, (match) => {
      const placeholder = `%%INLINE_CODE_${inlineIndex++}%%`;
      inlineCodes.push({ placeholder, original: match });
      return placeholder;
    });

    // 3. Protect VitePress custom containers
    const containers = [];
    let containerIndex = 0;
    processed = processed.replace(/:::\s*(\w+)(?:\s+\[?([\w\s()-]+)\]?)?/g, (match) => {
      const placeholder = `%%CONTAINER_${containerIndex++}%%`;
      containers.push({ placeholder, original: match });
      return placeholder;
    });

    // 4. Translate by combining paragraphs into larger chunks of up to 4000 chars to avoid API rate limits
    const paragraphs = processed.split('\n\n');
    let chunks = [];
    let currentChunk = '';
    
    for (const p of paragraphs) {
      if ((currentChunk + '\n\n' + p).length > 4000) {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = p;
      } else {
        currentChunk = currentChunk ? currentChunk + '\n\n' + p : p;
      }
    }
    if (currentChunk) chunks.push(currentChunk);

    let translatedChunks = [];
    for (const chunk of chunks) {
      if (chunk.trim() === '') {
        translatedChunks.push('');
        continue;
      }
      
      let retries = 3;
      let trans = '';
      while (retries > 0) {
        try {
          trans = await googleTranslate(chunk, lang);
          break;
        } catch (err) {
          retries--;
          if (retries === 0) {
            console.error('Failed translating chunk after retries:', err.message);
            trans = chunk; // fallback to original
          } else {
            console.log(`Rate limited or error. Retrying in 3s... (${retries} retries left)`);
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      }
      translatedChunks.push(trans);
      // Wait 1s between chunks
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    let translated = translatedChunks.join('\n\n');

    // 5. Restore containers
    for (const item of containers) {
      const regex = new RegExp(item.placeholder.replace(/%/g, '\\s*%?\\s*'), 'gi');
      translated = translated.replace(regex, item.original);
    }
    // 6. Restore inline codes
    for (const item of inlineCodes) {
      const regex = new RegExp(item.placeholder.replace(/%/g, '\\s*%?\\s*'), 'gi');
      translated = translated.replace(regex, item.original);
    }
    // 7. Restore code blocks
    for (const item of codeBlocks) {
      const regex = new RegExp(item.placeholder.replace(/%/g, '\\s*%?\\s*'), 'gi');
      translated = translated.replace(regex, item.original);
    }

    return translated;
  } catch (err) {
    console.error(`Failed to translate using Google Translate:`, err.message);
    return content;
  }
}

async function main() {
  console.log('--- VitePress i18n Bulk Translation / Mirroring Script ---');
  const mdFiles = getMarkdownFiles(DOCS_DIR);
  console.log(`Found ${mdFiles.length} markdown files to process.`);

  for (const lang of TARGET_LANGS) {
    const langDir = path.join(DOCS_DIR, lang);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    for (const filePath of mdFiles) {
      const relPath = path.relative(DOCS_DIR, filePath);
      const destPath = path.join(langDir, relPath);
      const destDir = path.dirname(destPath);

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      if (fs.existsSync(destPath)) {
        const existingContent = fs.readFileSync(destPath, 'utf-8');
        if (!existingContent.includes('Trang này hiện đang hiển thị bằng tiếng Anh') && !existingContent.includes('本页面正在等待自动翻译')) {
          console.log(`[Skip] ${lang}/${relPath} already exists (fully translated).`);
          continue;
        }
        console.log(`[Re-translate] ${lang}/${relPath} has placeholder note. Re-generating...`);
      } else {
        console.log(`[Process] Generating ${lang}/${relPath}...`);
      }

      let origContent = fs.readFileSync(filePath, 'utf-8');
      if (origContent.includes('./.vitepress')) {
        origContent = origContent.replace(/\.\/\.vitepress/g, '../.vitepress');
      }
      const translated = await translateContent(origContent, lang);
      fs.writeFileSync(destPath, translated, 'utf-8');
      
      // Delay 1.5 seconds between files to avoid rate-limiting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  console.log('--- i18n structure successfully generated! ---');
}

main().catch(console.error);
