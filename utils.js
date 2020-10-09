function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

function generateLog(firstPerson, secondPerson, damage) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage} [${firstPerson.hp.current} / ${firstPerson.hp.total}]`
    ];

    return logs[random(logs.length - 1)];
}

const $logs = document.getElementById('logs');

function renderLog(log) {
    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);
}

function countHit(count = 6, btn) {
    const innerText = btn.innerText;
    btn.innerText = `${innerText} (${count})`;
    return function () {
        count--;
        if (count === 0) {
            btn.disabled = true;
        }
        btn.innerText = `${innerText} (${count})`;
        return count;
    }
}

export {
    random,
    generateLog,
    renderLog,
    countHit
};