import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import database from '../../service/firebase'
//import {pokemons} from '../../data/pokemons'
import PokemonCard from "../../components/PokemonCard";



const GamePage = () => {

    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState({})
    const [keyPokemonIsActive, setKeyPokemonIsActive] = useState('')
    const [addedNewPokemon, setAddedNewPokemon] = useState(false)

    const getDataPokemons = () => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemonsData(snapshot.val())
        })
    }


    useEffect(() => {
        getDataPokemons()
    }, [])


    useEffect(() => {
    const modifiedPokemon = Object.entries(pokemonsData).filter(([key]) => key === keyPokemonIsActive).reduce((acc, el) => (acc[el[0]] = el[1]), {})
        if (Object.keys(modifiedPokemon).length > 0) {
            database.ref('pokemons/' + keyPokemonIsActive).set(modifiedPokemon)
        }

    }, [pokemonsData, keyPokemonIsActive])

    useEffect( () => {
        getDataPokemons()
    },[addedNewPokemon])

    const onchangeActiveCard = (id) => {

        setPokemonsData(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]}
                if (pokemon.id === id) {
                    setKeyPokemonIsActive(`${item[0]}`)
                    pokemon.active ? pokemon.active = false : pokemon.active = true

                }
                acc[item[0]] = pokemon

                return acc
            }, {})

        })

    }

    const handleClickButton = () => {
        const dataArray = Object.entries(pokemonsData)
        const indexArray = Math.floor(Math.random() * (dataArray.length))
        if (dataArray.length > 0) {
            const data = dataArray[indexArray][1]
            const newKey = database.ref().child('pokemons').push().key;
            database.ref('pokemons/' + newKey).set(data);

            setAddedNewPokemon(prewState => !prewState)
        }
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
                    <button onClick={handleClickButton}>доавить покемона</button>
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
                            onchangeActiveCard={onchangeActiveCard}
                        />
                    )
                }
                </div>

            </div>
        </>
    )
}

export default GamePage