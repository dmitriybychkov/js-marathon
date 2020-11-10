// task 1

const firstRow = prompt('First row:', 'мама мыла раму');
const secondRow = prompt('Second row:', 'собака друг человека');
const char = prompt('Введите букву');

function getRow(firstRow, secondRow) {
    return checkRow(firstRow) > checkRow(secondRow) ? firstRow :
    checkRow(firstRow) < checkRow(secondRow) ? secondRow :
    'There is no char like yours';
}

function checkRow(row) {
    let countChar = 0;
    for (let i = 0; i < row.length; i++) {
        if (row.charAt(i) === char) {
            countChar++;
        }
    }
    return countChar;
}

alert(getRow(firstRow, secondRow));