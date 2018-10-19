const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');

const workingDir = process.argv[2];
const cwd = path.join(__dirname, workingDir);

// Get list of files to hash
const hashingFiles = [
  'css/styles.min.css',
  'scripts/fontLoader.js',
];

// Replace file names with hashed counterpart and store reference of hashed name
const injectHashToFile = fileName => {
  const hash = md5(fileName);

  const array = fileName.split('/');

  let hashedFileName = '';
  array.forEach((o, i) => {
    if (i !== 0) hashedFileName += '/';

    if (i === array.length - 1) hashedFileName += hash;

    hashedFileName += o;
  });

  fs.rename(path.join(cwd, fileName), path.join(cwd, hashedFileName), err => {
    if (err) {
      console.error('Could not rename file', err);
    }
  });

  return hashedFileName;
};

const hashedFiles = hashingFiles.map(o => injectHashToFile(o));

// Replace file references with hashed file references
glob(
  `${cwd}/**/*`,
  (err, res) => {
    if (err) {
      console.error('Error', err);
    } else {
      const filteredRes = res.filter(o => {
        const arr = o.split('/');
        return arr[arr.length - 1].split('.').length >= 2;
      });

      filteredRes.forEach(file => {
        fs.readFile(file, 'utf8', (error, contents) => {
          if (error) {
            console.error('Could not read file', err);
          }

          hashedFiles.forEach((hashFile, i) => {
            contents = contents.replace(new RegExp(hashingFiles[i], 'g'), hashFile); // eslint-disable-line
          });

          fs.writeFile(file, contents, writeError => {
            if (writeError) {
              console.error('Could not write file');
            }
          });
        });
      });
    }
  },
);
