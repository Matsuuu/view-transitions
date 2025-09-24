const box = document.querySelector(".box");

/**
 * @typedef PokemonNameField
 * @property { string } eng
 * */

/**
 * @typedef PokemonEntry
 * @property { PokemonNameField } name
 * */

/**
 * @typedef { Record<string, PokemonEntry>} PokemonCollection
 * */

async function getPokemons() {
    /** @type { PokemonCollection } */
    const pokemonData = await fetch(
        "https://raw.githubusercontent.com/msikma/pokesprite/master/data/pokemon.json",
    ).then(res => res.json());
    console.log(pokemonData);

    const RANGE_MIN = 252;
    const RANGE_MAX = 308;

    const getSprite = (/** @type { PokemonEntry } */ pokemonData) =>
        `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemonData.name.eng.toLowerCase()}.png`;

    let counter = RANGE_MIN;
    return new Array(RANGE_MAX - RANGE_MIN)
        .fill(0)
        .map(() => counter++)
        .map(index => {
            return {
                index,
                imageUrl: getSprite(pokemonData[index]),
            };
        });
}

async function renderPokemons() {
    const pokemons = await getPokemons();
    console.log(pokemons);

    for (const pokemon of pokemons) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.className = "poke-label";

        const img = document.createElement("img");
        img.src = pokemon.imageUrl;

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "pokemon";

        // input.addEventListener("click", e => {
        //     e.preventDefault();

        //     document.startViewTransition(() => {
        //         input.checked = true;
        //     });
        // });

        label.appendChild(img);
        label.appendChild(input);
        div.appendChild(label);

        box.appendChild(div);
    }
}

renderPokemons();
