import Pokemon from "./pokemon.js";
import random from "./utils.js";
import generateLog from "./logs.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 500,
    type: 'electric',
    selector: 'character'
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 450,
    type: 'fire',
    selector: 'enemy'
});

// function $getElById(id) {
//     return document.getElementById(id);
// }

const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick2');

const $logs = document.getElementById('logs');

let countBtn1 = countHit(10, $btn);

$btn.addEventListener('click', function () {
    countBtn1();
    player1.changeHP(random(20), function (count) {
        console.log('hp changed!', count);
        const $p = document.createElement('p');
        const log = generateLog(player1, player2, count);
        $p.innerText = log;
        $logs.insertBefore($p, $logs.children[0]);
        console.log(log);
    });
    player2.changeHP(random(20), function (count) {
        console.log('hp changed!', count);
        console.log(generateLog(player2, player1, count));
    });
})

let countBtn2 = countHit(6, $btn2);

$btn2.addEventListener('click', function () {
    countBtn2();
    player1.changeHP(random(60, 20), function (count) {
        console.log('hp changed!', count);
        console.log(generateLog(player1, player2, count));
    });
    player2.changeHP(random(60, 20), function (count) {
        console.log('hp changed!', count);
        console.log(generateLog(player2, player1, count));
    });
})

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

// function changeHP(count) {
//     this.hp.current -= count;

//     const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
//     console.log(log);
//     const $p = document.createElement('p');
//     $p.innerText = log;
//     $logs.insertBefore($p, $logs.children[0]);

//     if (this.hp.current <= 0) {
//         this.hp.current = 0;
//         alert(this.name + ' lose');
//         $btn.disabled = true;
//         $btn2.disabled = true;
//     }

//     this.renderHP();
// }