const pokemonName = document.querySelector(".pokemon-name")
const pokemonNumber = document.querySelector(".pokemon-number")
const pokemonImage = document.querySelector(".img-poke")
const form = document.querySelector(".form")
const input = document.querySelector(".input-search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")

let searchPokemon = 1

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status ===200){
    const data = await APIResponse.json()
    return data;
    }
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'LOADING...'.toLocaleLowerCase();
    const data = await fetchPokemon(pokemon);
    if(data)
    {
        
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '' 
        searchPokemon = data.id
    }else{
        pokemonName.innerHTML = 'não encontrado'
        pokemonNumber.innerHTML = ''
        pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/201.png";
    }
    
}

form.addEventListener('submit', (event) => { 
event.preventDefault();
renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', (event) => { 
    if(searchPokemon > 1 ){
         searchPokemon -= 1
         renderPokemon(searchPokemon)
     }

    
    })
   
buttonNext.addEventListener('click', (event) => { 
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)