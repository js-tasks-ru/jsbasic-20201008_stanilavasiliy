/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {

  constructor(rows) {
    this.createTable();
    this.fillTable(rows);
    this.setEventListener();
  }

  createTable () {
    this.elem = document.createElement('table');
    this.elem.createTHead().innerHTML = `<tr>
                                          <th>Имя</th>
                                          <th>Возраст</th>
                                          <th>Зарплата</th>
                                          <th>Город</th>
                                          <th></th>
                                        </tr>`;
  }

  fillTable (rows) {
    let tbody = this.elem.createTBody();    

    for (let row of rows) {
      let tr = document.createElement('tr');
      let tdName = document.createElement('td');
      let tdAge = document.createElement('td');
      let tdSalary = document.createElement('td');
      let tdCity = document.createElement('td');
      let tdClose = document.createElement('td');
      let button = document.createElement('button');

      button.innerHTML = 'X';

      tdName.innerHTML = row.name;
      tdAge.innerHTML = row.age;
      tdSalary.innerHTML = row.salary;
      tdCity.innerHTML = row.city;
      tdClose.appendChild(button);

      tr.appendChild(tdName);
      tr.appendChild(tdAge);
      tr.appendChild(tdSalary);
      tr.appendChild(tdCity);
      tr.appendChild(tdClose);
      
      tbody.appendChild(tr);
    }
  }

  setEventListener () {
    let tbody = this.elem.getElementsByTagName('tbody')[0];
    tbody.addEventListener('click', (event) => {
      if (event.target.tagName == 'BUTTON') {
        event.target.closest('tr').remove();
      }
    });
  }
}
