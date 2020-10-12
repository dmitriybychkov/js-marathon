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

    getDamage = async (player1Id, attackId, player2Id) => {
        const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${player1Id}&attackId=${attackId}&player2id=${player2Id}`);
        const body = await response.json();
        return body;
    }

    start = async () => {
        const pokemons = await this.getPokemons();

        const pikachu = pokemons.find(item => item.name === 'Pikachu');
        
        const player1 = new Pokemon({
            ...pikachu,
            selector: 'player1'
        });

        const randomEnemy = await this.getRandomPokemon();

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
                const damage = await this.getDamage(player1.id, player1.attacks[i].id, player2.id);
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

const newGame = new Game();
newGame.start();

export default Game;