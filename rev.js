const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');

// Get working directory relative to root
const workingDir = process.argv[2];
const cwd = path.join(__dirname, workingDir);

// Get list of files to hash
const hashingFiles = [];
const patterns = process.argv[3].split(' ');
patterns.forEach(pattern => {
  const files = glob.sync(`${cwd}/**/${pattern}`);
  hashingFiles.push(...files);
});

const getSimplePath = fileNames => fileNames.map(file => {
  const fileArr = file.split('/');
  return `${fileArr[fileArr.length - 1]}`;
});

const relativeHashingFiles = getSimplePath(hashingFiles);

// Replace file names with hashed counterpart and store reference of hashed name
const hashedFiles = getSimplePath(hashingFiles.map(fileName => {
  const hash = md5(fileName);

  const array = fileName.split('/');

  let hashedFileName = '';
  array.forEach((o, i) => {
    if (i !== 0) hashedFileName += '/';

    if (i === array.length - 1) hashedFileName += hash;

    hashedFileName += o;
  });

  fs.rename(fileName, hashedFileName, err => {
    if (err) {
      console.error('Could not rename file', err);
    }
  });

  return hashedFileName;
}));

// Replace file references with hashed file references
glob(
  `${cwd}/**/*`,
  (err, res) => {
    if (err) {
      console.error('Error', err);
    }

    // Filter all dirs and keep files only
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
            contents = contents.replace(new RegExp(relativeHashingFiles[i], 'g'), hashFile); // eslint-disable-line
        });

        fs.writeFile(file, contents, writeError => {
          if (writeError) {
            console.error('Could not write file');
          }
        });
      });
    });
  },
);
