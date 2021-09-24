import React, {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";

import PokemonCard from "../../../../components/PokemonCard";
import {FireBaseContext} from "../../../../context/farebaseContext";
import {PokemonContext} from "../../../../context/pokemonContext";
import s from './style.module.css'


const StartPage = () => {
    const firebase = useContext(FireBaseContext)
    const pokemonsContext = useContext(PokemonContext)

    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState({})

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemonsData(pokemons)
        })
        return () => {
            firebase.offPokemonSoket()
        }
    }, [])

    const handleChangeSelected = (key) => {
        const pokemon = {...pokemonsData[key]}
        pokemonsContext.onSelectedPokemons(key, pokemon)
        setPokemonsData(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected
            }
        }))

    }


    const handleStartGameClick = () => {
        history.push('/game/board')
    }

    return (
        <>
            <div >

                <div>
                    <button
                        onClick={handleStartGameClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                    >
                        Start Game
                    </button>
                </div>

                <div className={s.flex}>
                    {
                        Object.entries(pokemonsData).map(([key, {name, img, id, type, values, selected}]) => (
                            <PokemonCard
                                className={s.card}
                                key={key}
                                name={name}
                                img={img}
                                id={id}
                                type={type}
                                values={values}
                                isActive={true}
                                isSelected={selected}
                                onchangeActiveCard={() => {
                                    if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                                        handleChangeSelected(key)
                                    }
                                }}
                            />
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default StartPage