import Pokemon from "./pokemon.js";
import {
    random,
    generateLog,
    renderLog,
    countHit
} from "./utils.js";
import {
    pokemons
} from "./pokemons.js";

const $contol = document.querySelector('.control');

function startGame() {
    // const pikachu = pokemons.find(item => item.name === 'Pikachu');
    const random1 = pokemons[random(pokemons.length - 1)];

    const player1 = new Pokemon({
        // ...pikachu,
        ...random1,
        selector: 'player1'
    });

    // const charmander = pokemons.find(item => item.name === 'Charmander');
    const random2 = pokemons[random(pokemons.length - 1)];

    const player2 = new Pokemon({
        // ...charmander,
        ...random2,
        selector: 'player2'
    });

    player1.attacks.forEach(item => {
        // console.log(item);
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;

        const hitCount = countHit(item.maxCount, $btn);
        $btn.addEventListener('click', () => {
            // console.log($btn.innerText);
            hitCount();
            player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                renderLog(generateLog(player2, player1, count));
            });
            player1.changeHP(random(player2.attacks[0].maxDamage, player2.attacks[0].minDamage), function (count) {
                renderLog(generateLog(player1, player2, count));
            });
        });
        $contol.appendChild($btn);
    });

    player2.attacks.forEach(item => {
        // console.log(item);
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;

        const hitCount = countHit(item.maxCount, $btn);
        $btn.addEventListener('click', () => {
            // console.log($btn.innerText);
            hitCount();
            player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                renderLog(generateLog(player1, player2, count));
            });
        });
        $contol.appendChild($btn);
    });
}
startGame();

function resetGame() {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    startGame();
}

export default resetGame;