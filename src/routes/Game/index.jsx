import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import database from '../../service/firebase'
//import {pokemons} from '../../data/pokemons'
import PokemonCard from "../../components/PokemonCard";

const idPokemon = new Date()
const DATA = {
    "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
    ],
    "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
    },
    "type": "flying",
    "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    "name": "pidgeotto",
    "base_experience": 122,
    "height": 11,
    "id": +idPokemon,
    "values": {
        "top": "A",
        "right": 2,
        "bottom": 7,
        "left": 5
    }
}

const GamePage = () => {

    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState({})

    const getPokemons = () => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemonsData(snapshot.val())
        })
    }

    useEffect(() => {
        getPokemons()
    }, [])


    const handleChangeActive = (id) => {

        setPokemonsData(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]}
                if (pokemon.id === id) {

                    pokemon.active = !pokemon.active
                }

                acc[item[0]] = pokemon

                database.ref('pokemons/' + item[0]).set(pokemon)

                return acc
            }, {})
        })
    }

    const handleAddPokemon = () => {
        const data = DATA
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(data);
        getPokemons()
    }

    const handleClick = () => {
        history.push('/')
    }

    return (
        <>
            <div >
                <div>
                    <button onClick={handleClick}>return Home Page</button>
                </div>
                <div>
                    <button onClick={handleAddPokemon}>доавить покемона</button>
                </div>
                <h1>
                    This is Game Page!!!
                </h1>
                <div className="flex">
                {
                    Object.entries(pokemonsData).map(([key, {name, img, id, type, values, active}]) =>  <PokemonCard
                            key={key}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={active}
                            onchangeActiveCard={handleChangeActive}
                        />
                    )
                }
                </div>

            </div>
        </>
    )
}

export default GamePage