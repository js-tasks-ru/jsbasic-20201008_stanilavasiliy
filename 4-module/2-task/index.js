/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let tbody = table.children[0];

    for (let i = 0; i < tbody.children.length; i++) {
        tbody.rows[i].cells[i].style.background = 'red';
    }
}
