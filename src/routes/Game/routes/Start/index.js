import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectedPokemons, addSelectedPokemon, cleanSelectedPokemon } from "../../../../store/selectedPokemons";
import {
    getPokemonsAsync,
    selectPokemonsData,
    selectPokemonsIsLoading
} from "../../../../store/pokemons";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css'



const StartPage = () => {

    const pokemonsRedux = useSelector(selectPokemonsData)
    const allSelectedPokemons = useSelector(selectedPokemons)
    const isLoading = useSelector(selectPokemonsIsLoading)
    const dispatch = useDispatch()
    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState({})

    useEffect(() => {
        dispatch(cleanSelectedPokemon())
        dispatch(getPokemonsAsync())
    }, [dispatch])

    useEffect (() => {
        setPokemonsData(pokemonsRedux)
    }, [pokemonsRedux])

    const handleChangeSelected = (key) => {
        const pokemon = {...pokemonsData[key]}
        dispatch(addSelectedPokemon({key, pokemon}))
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
                        disabled={Object.keys(allSelectedPokemons).length < 5}
                    >
                        Start Game
                    </button>

                </div>
                {isLoading && <h1>LOADING...</h1>}

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
                                    if (Object.keys(allSelectedPokemons).length < 5 || selected) {
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