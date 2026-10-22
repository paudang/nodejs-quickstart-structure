// Files are split into chunks so the generated commands stay under the
// Windows command-line length limit (~8191 chars), e.g. on the initial commit.
const CHUNK_SIZE = 20;

const quote = (file) => `"${file}"`;

const chunked = (command) => (files) => {
  const commands = [];
  for (let i = 0; i < files.length; i += CHUNK_SIZE) {
    commands.push(`${command} ${files.slice(i, i + CHUNK_SIZE).map(quote).join(' ')}`);
  }
  return commands;
};

export default {
  '*.{js,ts}': (files) => [...chunked('eslint --fix')(files), ...chunked('prettier --write')(files)],
};
