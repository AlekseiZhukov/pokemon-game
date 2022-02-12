import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    selectedPokemonsPlayer1,
    addSelectedPokemon,
    cleanSelectedPokemon,
    addPlayer2Pokemons, setTypeFinishedGame
} from "../../../../store/selectedPokemons";
import {
    getPokemonsAsync,
    selectPokemonsData,
    selectPokemonsIsLoading
} from "../../../../store/pokemons";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css'
//import FirebaseClass from "../../../../service/firebase";



const StartPage = () => {

    const pokemonsRedux = useSelector(selectPokemonsData)
    const allSelectedPokemons = useSelector(selectedPokemonsPlayer1)
    const isLoading = useSelector(selectPokemonsIsLoading)
    const dispatch = useDispatch()
    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState({})

    useEffect(() => {

        dispatch(getPokemonsAsync())
        dispatch(cleanSelectedPokemon())
        dispatch(addPlayer2Pokemons([]))
        dispatch(setTypeFinishedGame(null))

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
            <div className={s.root}>
                <div className={s.buttonWrap}>
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