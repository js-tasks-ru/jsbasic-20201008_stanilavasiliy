/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sumSalaries = 0;
  
  for (let key in salaries) {
    if (Number.isInteger(salaries[key])){
      sumSalaries += salaries[key];
    }
  }
  return sumSalaries;
}
