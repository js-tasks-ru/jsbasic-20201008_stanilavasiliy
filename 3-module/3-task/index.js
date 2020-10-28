/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arr = str.split('-');

  for (let i = 1; i < arr.length; i++) {
    let word = arr[i];
    word = word[0].toUpperCase() + word.slice(1);
    arr[i] = word;
  }

  return arr.join('');
}
