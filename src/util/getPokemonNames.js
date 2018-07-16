const axios = require('axios');
const fs = require('fs');

async function getPokemonNames () {
    let json = { names: [] };
    let query = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    
    while (query.data.next) {
        query.data.results.forEach(pokemon => json.names.push(pokemon.name));
        query = await axios.get(query.data.next);
    }
    query.data.results.forEach(pokemon => json.names.push(pokemon.name));

    return json;
}

getPokemonNames().then(json => {
    json = JSON.stringify(json);
    fs.writeFile('pokemonNames.json', json, 'utf8');
});
