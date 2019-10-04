const {
  lstatSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} = require('fs');
const { extname, join } = require('path');

const prettier = require('prettier');
const { loadFront } = require('yaml-front-matter');

const getMarkdownFiles = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .map(path =>
      lstatSync(path).isDirectory() ? getMarkdownFiles(path) : [path],
    )
    .reduce((acc, curr) => [...acc, ...curr], [])
    .filter(path => extname(path) === '.md');

for (const path of getMarkdownFiles(`${__dirname}/../src/pages`)) {
  const text = readFileSync(path);

  const meta = loadFront(text);
  const content = meta.__content;

  delete meta.__content;
  meta.date = meta.date;

  const metaString = prettier
    .format(`export const meta = ${JSON.stringify(meta, null, 2)}`, {
      parser: 'babylon',
      singleQuote: true,
      trailingComma: 'all',
    })
    .slice(0, -1);
  const contentString = prettier.format(content, {
    parser: 'markdown',
    proseWrap: 'always',
  });

  const output = `${metaString}\n\n${contentString}`;
  const outputPath = path.replace(extname(path), '.mdx');

  writeFileSync(outputPath, output);
  unlinkSync(path);
}
