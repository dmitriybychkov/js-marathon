const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function getRow(firstRow, secondRow) {
    let firstRowSum = 0,
        secondRowSum = 0;
    for (let i = 0; i < firstRow.length; i++) {
        if (firstRow.charAt(i) === 'а') {
            firstRowSum++;
        }
    }
    for (let i = 0; i < secondRow.length; i++) {
        if (secondRow.charAt(i) === 'а') {
            secondRowSum++;
        }
    }
    return firstRowSum > secondRowSum ? firstRow : secondRow;
}
console.log(getRow(firstRow, secondRow));