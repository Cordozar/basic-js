const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const fileOccurrences = {};

  return names.map((name) => {
    if (fileOccurrences[name] === undefined) {
      fileOccurrences[name] = 0;
      return name;
    } else {
      fileOccurrences[name]++;
      const newName = `${name}(${fileOccurrences[name]})`;
      return getUniqueName(newName, fileOccurrences);
    }
  });

  function getUniqueName(name, occurrences) {
    if (occurrences[name] === undefined) {
      occurrences[name] = 0;
      return name;
    } else {
      occurrences[name]++;
      const newName = `${name}(${occurrences[name]})`;
      return getUniqueName(newName, occurrences);
    }
  }
}

module.exports = {
  renameFiles,
};
