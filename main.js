const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemones = [];

// obtener todos los Pokémon
async function obtenerPokemon() {
    for (let i = 1; i <= 151; i++) {
        await fetch(URL + i)
            .then((response) => response.json())
            .then(data => pokemones.push(data));
    }
    // Ordenar los al obtenerlos
    pokemones.sort((a, b) => a.id - b.id);
    mostrarTodosLosPokemon(); 
}

function mostrarTodosLosPokemon() {
    listaPokemon.innerHTML = ""; // Limpiar el contenedor
    pokemones.forEach(pokemon => mostrarPokemon(pokemon));
}


function mostrarPokemon(data) {
    let dataId = data.id.toString();

    if (dataId.length === 1) {
        dataId = "00" + dataId;
    } else if (dataId.length === 2) {
        dataId = "0" + dataId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${dataId}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${dataId}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${data.types.map(type => `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`).join("")}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height / 10}m</p>
                <p class="stat">${data.weight / 10}Kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Obtener todos los Pokémon al cargar la página
obtenerPokemon();

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; // Limpiar el contenedor antes de mostrar los pokémon de cada tipo

    //segun el tipo y ordenarlos
    let pokemonesFiltrados = pokemones.filter(pokemon => {
        if (botonId === "ver-todos") {
            return true; // Mostrar todos
        } else {
            const tipos = pokemon.types.map(type => type.type.name);
            return tipos.some(tipo => tipo.includes(botonId)); // por tipo
        }
    });

    // Ordenar lospokemon por ID
    pokemonesFiltrados.sort((a, b) => a.id - b.id);

    // Mostrar los Pokémon por tipo y ordenados
    pokemonesFiltrados.forEach(pokemon => mostrarPokemon(pokemon));
}));



