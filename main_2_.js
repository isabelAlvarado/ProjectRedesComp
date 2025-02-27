const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const API_URL = "https://rickandmortyapi.com/api/character";

let allCharacters = []; // Guarda todos los personajes una vez cargados

async function getAllCharacters() {
    let nextPage = API_URL;

    try {
        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextPage = data.info.next; // Ir a la siguiente pagina
        }

        showCharacters(allCharacters); // Mostrar todos los personajes al inicio

    } catch (error) {
        console.error("Error al obtener los personajes:", error);
    }
}

function showCharacters(characters) {
    listaPokemon.innerHTML = ""; // Limpiar antes de agregar nuevos personajes

    characters.forEach(personaje => {
        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <div class="pokemon-imagen">
                <img src="${personaje.image}" alt="${personaje.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <h2 class="pokemon-nombre">${personaje.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    <p>${personaje.status} - ${personaje.species}</p>
                </div>
            </div>
        `;
        listaPokemon.appendChild(div);
    });
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    let personajesFiltrados = allCharacters.filter(personaje => {
        if (botonId === "ver-todos") {
            return true; // Mostrar todos
        } else if (botonId === "vivos") {
            return personaje.status === "Alive"; 
        } else if (botonId === "muertos") {
            return personaje.status === "Dead"; 
        }
        return false;
    });

    showCharacters(personajesFiltrados); // Mostrar la lista filtrada
}));

// Llamar a la función para obtener todos los personajes al cargar la página
getAllCharacters();
