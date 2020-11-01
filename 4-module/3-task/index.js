/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    let tbody = table.children[1];

    for (let tr of tbody.children) {
        //Abalability
        if (tr.cells[3].dataset.available == 'true') {
            tr.classList.add('available');
        }
        if (tr.cells[3].dataset.available == 'false') {
            tr.classList.add('unavailable');
        }
        if (tr.cells[3].dataset.available == undefined) {
            tr.hidden = true;
        }

        //Gender
        if (tr.cells[2].innerHTML == 'm') {
            tr.classList.add('male');
        }
        if (tr.cells[2].innerHTML == 'f') {
            tr.classList.add('female');
        }

        //Age
        if (+tr.cells[1].innerHTML < 18) {
            tr.style.textDecoration = 'line-through';
        }
    }
}
