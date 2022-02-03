import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard";
import {FireBaseContext} from "../../../../context/farebaseContext";
import {useSelector} from "react-redux";
import {player2Pokemons, selectedPokemons} from "../../../../store/selectedPokemons";



const FinishPage = () => {

    const firebase = useContext(FireBaseContext)
    const pokemons = useSelector(selectedPokemons)
    const pokemonsPlayer2 = useSelector(player2Pokemons)
    const [selectedCard, setSelectedCard] = useState(null)
    const [player2PokemonsData, setPlayer2Pokemons] = useState(pokemonsPlayer2)
    const [allPokemonsId, setAllPokemonsId] = useState([])
    const [message, setMessage] = useState('')

    const history = useHistory()

    const handleChangeSelectedCard = (id) => {
        setPlayer2Pokemons(prevState => {
            let copyState = [...prevState]

            copyState.forEach(item => {
                if (item.id === id) {
                    if(!item.selected) { item.selected = true} else { item.selected = !item.selected}
                }
            })

            return copyState
        })
    }

    const handleClickButton = () => {
        if (selectedCard && allPokemonsId.indexOf(selectedCard.id) === -1) {
            const data = {...selectedCard}
            delete data.selected
            firebase.addPokemon(data)
        }
        if (allPokemonsId.indexOf(selectedCard.id) !== -1) {
            setMessage('Такой покмон у Вас уже есть')
            setTimeout(() => setMessage(''), 1000)
        }
        history.replace('/game/')
    }

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setAllPokemonsId(Object.entries(pokemons).map(([key, {id}]) => id))
        })
        return () => {
            firebase.offPokemonSoket()
        }
    }, [firebase])


    useEffect(() => {

        for (let item of player2PokemonsData) {
            if (item.selected) {
                setSelectedCard(item)
            }
        }
        return () => setSelectedCard(null)
    },[player2PokemonsData])

    if (!pokemons || !player2Pokemons) {
        history.replace('/game/')
    }

    return (
        <div className={s.root}>

            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values}]) => (
                        <PokemonCard
                            className={s.card}
                            key={key}
                            name={name}
                            img={img}
                            id={id}
                            type={type}
                            values={values}
                            isActive={true}
                        />
                    ))
                }
            </div>
            <div className={s.flex} >
                <button disabled = {!selectedCard}
                    onClick={() => handleClickButton()}
                >
                    END GAME
                </button>
                {message && <p>{message}</p>}
            </div>
            <div className={s.flex}>
                {
                    player2PokemonsData && player2PokemonsData.map((item) => (
                        <PokemonCard
                            className={s.card}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                            isSelected={item.selected}
                            onchangeActiveCard={(id) => {
                                if (!selectedCard || selectedCard.id === item.id) {
                                    handleChangeSelectedCard(id)
                                }

                            }}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default FinishPage