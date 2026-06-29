import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../docs');
const TARGET_LANGS = ['vi', 'zh'];

function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
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
  try {
    const placeholders = [];
    let placeholderId = 0;
    const comments = [];

    // 1. Protect code blocks but extract comments inside them for translation
    let processed = content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, codeLang, code) => {
      const lines = code.split('\n');
      const processedLines = lines.map(line => {
        // # comment
        const hashMatch = line.match(/^(\s*#\s*)(.*)$/);
        if (hashMatch) {
          const prefix = hashMatch[1];
          const commentText = hashMatch[2];
          if (commentText.trim().length > 1) {
            const key = `%%COMMENT_${placeholderId++}%%`;
            comments.push({ key, original: commentText });
            return prefix + key;
          }
        }
        // // comment
        const slashMatch = line.match(/^(\s*\/\/\s*)(.*)$/);
        if (slashMatch) {
          const prefix = slashMatch[1];
          const commentText = slashMatch[2];
          if (commentText.trim().length > 1) {
            const key = `%%COMMENT_${placeholderId++}%%`;
            comments.push({ key, original: commentText });
            return prefix + key;
          }
        }
        return line;
      });

      const reconstructedCode = `\`\`\`${codeLang}\n${processedLines.join('\n')}\`\`\``;
      const key = `%%CODE_BLOCK_${placeholderId++}%%`;
      placeholders.push({ key, original: reconstructedCode });
      return key;
    });

    // 2. Protect inline code
    processed = processed.replace(/`[^`\n]+`/g, (match) => {
      const key = `%%INLINE_CODE_${placeholderId++}%%`;
      placeholders.push({ key, original: match });
      return key;
    });

    // 3. Protect Markdown links [text](url) - only translate text, preserve URL
    processed = processed.replace(/\[([^\]\n]+)\]\(([^)\n]+)\)/g, (match, text, url) => {
      const urlKey = `%%LINK_URL_${placeholderId++}%%`;
      placeholders.push({ key: urlKey, original: url });
      return `[${text}](${urlKey})`;
    });

    // 4. Protect VitePress custom containers
    processed = processed.replace(/:::\s*(\w+)(?:\s+\[?([\w\s()-]+)\]?)?/g, (match) => {
      const key = `%%CONTAINER_START_${placeholderId++}%%`;
      placeholders.push({ key, original: match });
      return key;
    });
    
    processed = processed.replace(/:::/g, (match) => {
      const key = `%%CONTAINER_END_${placeholderId++}%%`;
      placeholders.push({ key, original: match });
      return key;
    });

    // Translate all extracted comments in a single batch
    if (comments.length > 0) {
      const commentsText = comments.map(c => c.original).join('\n\n');
      try {
        const translatedCommentsText = await googleTranslate(commentsText, lang);
        // Split back by \n\n but handle spacing changes gracefully
        const translatedLines = translatedCommentsText.split(/\n\s*\n/);
        for (let i = 0; i < comments.length; i++) {
          comments[i].translated = (translatedLines[i] || comments[i].original).trim();
        }
      } catch (err) {
        console.error('Error translating comments batch, keeping original:', err.message);
        comments.forEach(c => c.translated = c.original);
      }
      // Wait 1.5 seconds after comments translation to clear rate limit
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Translate in chunks of max 3000 chars to respect limits
    const paragraphs = processed.split('\n\n');
    let chunks = [];
    let currentChunk = '';
    
    for (const p of paragraphs) {
      if ((currentChunk + '\n\n' + p).length > 3000) {
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
            console.error('Failed translating chunk, keeping original:', err.message);
            trans = chunk;
          } else {
            console.log(`Rate limited (429). Waiting 5s before retry... (${retries} retries left)`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      }
      translatedChunks.push(trans);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    
    let translated = translatedChunks.join('\n\n');

    // First restore translated comments inside code block placeholders
    for (const comment of comments) {
      for (const item of placeholders) {
        if (item.key.startsWith('%%CODE_BLOCK_')) {
          item.original = item.original.replace(comment.key, comment.translated || comment.original);
        }
      }
    }

    // Restore placeholders in reverse order
    for (let i = placeholders.length - 1; i >= 0; i--) {
      const { key, original } = placeholders[i];
      const regexStr = key.replace(/_/g, '[_\\s]*').replace(/%/g, '\\s*%?\\s*');
      const regex = new RegExp(regexStr, 'gi');
      translated = translated.replace(regex, original);
    }

    // Post-processing cleanup
    translated = translated.replace(/\]\(\s+/g, '](');
    translated = translated.replace(/\s+\)/g, ')');

    return translated;
  } catch (err) {
    console.error('Translation error:', err.message);
    return content;
  }
}

async function main() {
  console.log('--- VitePress Core i18n Translation Script ---');
  const mdFiles = getMarkdownFiles(DOCS_DIR);
  console.log(`Found ${mdFiles.length} markdown files.`);

  const lang = 'zh';
  const langDir = path.join(DOCS_DIR, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  // Files we want to translate for Chinese (zh)
  const filesToTranslate = [
    'blueprints/local-dev.md',
    'blueprints/docker-pm2.md',
    'architecture/mvc.md',
    'architecture/clean-architecture.md',
    'features/background-jobs.md',
    'features/ai-native.md',
    'features/caching.md',
    'features/communication.md',
    'features/database.md',
    'features/resilience.md',
    'infrastructure/terraform.md',
    'infrastructure/elk-stack.md',
    'guide/testing.md',
    'guide/security-hardening.md',
    'guide/deployment.md',
    'guide/troubleshooting.md',
    'guide/articles.md'
  ];

  for (const filePath of mdFiles) {
    const relPath = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
    if (!filesToTranslate.includes(relPath)) {
      console.log(`[Skip] Not in filesToTranslate list: ${relPath}`);
      continue;
    }

    const destPath = path.join(langDir, relPath);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`[Translate] Force generating/fixing ${lang}/${relPath}...`);
    let origContent = fs.readFileSync(filePath, 'utf-8');
    if (origContent.includes('./.vitepress')) {
      origContent = origContent.replace(/\.\/\.vitepress/g, '../.vitepress');
    }
    
    const translated = await translateContent(origContent, lang);
    fs.writeFileSync(destPath, translated, 'utf-8');
    
    // Delay 10 seconds between files to be extremely polite and avoid 429
    console.log(`Finished ${lang}/${relPath}. Sleeping 10s...`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }

  console.log('--- Translation complete! ---');
}

main().catch(console.error);
