/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  
  if (n === 1 || n === 0) {
    return 1;
  }

  if ((n ^ 0) === n) {
    let result = n;

    for (; n > 1; n--) {
      result *= n - 1;
    }

    return result;
  }

  return "There is a mistake";
}
