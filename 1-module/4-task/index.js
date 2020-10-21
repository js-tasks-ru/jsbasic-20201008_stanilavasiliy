/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {

  let stopWord1 = "1xbet",
      stopWord2 = "xxx",
      checkStr = str.toLowerCase();

  if (checkStr.includes(stopWord1) || checkStr.includes(stopWord2)) {
    return true;
  }

  return false;
}
