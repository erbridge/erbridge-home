const { lstatSync, readdirSync, readFileSync } = require('fs');
const { extname, join, relative } = require('path');

const mdx = require('@mdx-js/mdx');
const metagen = require('directory-metagen');
const safeEval = require('safe-eval');

process.env.BABEL_ENV = 'production';

const isDirectory = source => lstatSync(source).isDirectory();

const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const parseMeta = (files, { path: basePath }) => {
  let output = 'export default ';

  output += JSON.stringify(
    files.map(path => {
      const fullPath = join(basePath, path);
      const text = readFileSync(fullPath, 'utf8');
      const jsx = mdx.sync(text);

      const metaStart = 'export const meta =';
      const metaStartIndex = jsx.indexOf(metaStart) + metaStart.length;

      if (metaStartIndex === -1) {
        throw new Error(`${fullPath} has missing or invalid metadata`);
      }

      const metaEnd = '};\n';
      const metaEndIndex =
        jsx.indexOf(metaEnd, metaStartIndex) + metaEnd.length;

      const metaString = jsx.substr(
        metaStartIndex,
        metaEndIndex - metaStartIndex,
      );
      const meta = safeEval(metaString);

      return {
        ...meta,
        path: relative(join(__dirname, '..', 'src', 'pages'), fullPath),
      };
    }),
  );

  output += ';';

  return output;
};

getDirectories(join(__dirname, '..', 'src', 'pages'))
  .map(path => ({
    path,
    format: parseMeta,
    filter: files => files.filter(filepath => extname(filepath) === '.mdx'),
    output: 'index.js',
  }))
  .forEach(metagen);
