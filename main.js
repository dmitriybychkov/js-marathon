function $getElById(id) {
    return document.getElementById(id);
}

const $btn = document.getElementById('btn-kick');
const $logs = document.getElementById('logs');

const character = {
    name: 'Pikachu',
    type: 'electric',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    hp: {
        current: 100,
        total: 100
    },
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP

}

const enemy = {
    name: 'Charmander',
    weakness: ['fighting', 'water'],
    resistance: ['steel'],
    hp: {
        current: 100,
        total: 100
    },
    elHP: $getElById('health-enemy'),
    elProgressbar: $getElById('progressbar-enemy'),
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressbarHP
}

$btn.addEventListener('click', function () {
    console.log('Kick!');
    character.changeHP(random(20));
    enemy.changeHP(random(20));
})

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function renderHPLife() {
    const {
        hp: {
            current,
            total
        },
        elHP
    } = this;
    elHP.innerText = current + ' / ' + total;
}

function renderProgressbarHP() {
    const {
        elProgressbar,
        hp: {
            current
        }
    } = this;
    elProgressbar.style.width = current + '%';
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    this.hp.current -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);
    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);

    if (this.hp.current <= 0) {
        this.hp.current = 0;
        alert(this.name + ' lose');
        $btn.disabled = true;
    }

    this.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
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

init();