/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let usersFiltered = users.filter( user => user.age <= age );
  let result = usersFiltered.map( user => `${user.name}, ${user.balance}` );
  
  return result.join('\n');
}