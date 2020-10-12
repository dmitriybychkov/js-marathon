class Api {
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
}

export default Api;