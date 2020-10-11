import Pokemon from "./pokemon.js";
import {
    random,
    generateLog,
    renderLog,
    countHit
} from "./utils.js";
// import {
//     pokemons
// } from "./pokemons.js";



class Game {
    getPokemons = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
        const body = await response.json();
        return body;
    }

    getRandomPokemon = async () => {
        const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
        const body = await response.json();
        return body;
    }

    start = async () => {
        const pokemons = await this.getPokemons();

        const pikachu = pokemons.find(item => item.name === 'Pikachu');
        // const random1 = pokemons[random(pokemons.length - 1)];

        const player1 = new Pokemon({
            ...pikachu,
            // ...random1,
            selector: 'player1'
        });

        // const charmander = pokemons.find(item => item.name === 'Charmander');
        // const random2 = pokemons[random(pokemons.length - 1)];
        const random2 = await this.getRandomPokemon();

        const player2 = new Pokemon({
            // ...charmander,
            ...random2,
            selector: 'player2'
        });

        const $contol = document.querySelector('.control');

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

    reset = () => {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());
        const allLogs = document.querySelectorAll('p');
        allLogs.forEach($item => $item.remove());
        const newGame = new Game();
        newGame.start();
    }
}

const newGame = new Game();
newGame.start();
newGame.getRandomPokemon();

export default Game;