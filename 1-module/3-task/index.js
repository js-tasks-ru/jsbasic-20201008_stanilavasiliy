/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  
  if (str === '') {
    return str;
  }

  let result = str[0].toUpperCase() + str.slice(1);

  return result;
}
