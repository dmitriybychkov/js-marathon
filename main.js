import Pokemon from "./pokemon.js";
import Api from "./api.js";
import {
    // random,
    generateLog,
    renderLog,
    countHit
} from "./utils.js";
// import {
//     pokemons
// } from "./pokemons.js";

class Game {
    start = async () => {
        const pokemons = await api.getPokemons();

        const pikachu = pokemons.find(item => item.name === 'Pikachu');
        
        const player1 = new Pokemon({
            ...pikachu,
            selector: 'player1'
        });

        const randomEnemy = await api.getRandomPokemon();

        const player2 = new Pokemon({
            ...randomEnemy,
            selector: 'player2'
        });

        const $contol = document.querySelector('.control');

        player1.attacks.forEach((item, i) => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = item.name;
    
            const hitCount = countHit(item.maxCount, $btn);
            $btn.addEventListener('click', async () => {
                hitCount();
                const damage = await api.getDamage(player1.id, player1.attacks[i].id, player2.id);
                player2.changeHP(damage.kick.player2, function (count) {
                    renderLog(generateLog(player2, player1, count));
                });
                player1.changeHP(damage.kick.player1, function (count) {
                    renderLog(generateLog(player1, player2, count));
                });
            });
            $contol.appendChild($btn);
        });
    }

    reset = () => {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());
        const allLogs = document.querySelectorAll('#logs p');
        allLogs.forEach($item => $item.remove());
        const newGame = new Game();
        newGame.start();
    }
}
const api = new Api();
const newGame = new Game();
newGame.start();

export default Game;