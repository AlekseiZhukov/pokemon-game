import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import s from "./style.module.css";
import PokemonCard from "../../../../components/PokemonCard";
import {useDispatch, useSelector} from "react-redux";
import {player2Pokemons, selectedPokemonsPlayer1, typeFinishedGame} from "../../../../store/selectedPokemons";
import {cleanPokemonsData, selectPokemonsData} from "../../../../store/pokemons";
import FirebaseClass from "../../../../service/firebase";
import {selectLocalIdDataUser} from "../../../../store/user";

const FinishPage = () => {

    const pokemonsSelectedPlayer1 = useSelector(selectedPokemonsPlayer1)
    const pokemonsPlayer2 = useSelector(player2Pokemons)
    const allPokemonsPlayer1 = useSelector(selectPokemonsData)
    const userIdLocal = useSelector(selectLocalIdDataUser)
    const finishGameType =  useSelector(typeFinishedGame)
    const [selectedCard, setSelectedCard] = useState(null)
    const [player2PokemonsData, setPlayer2Pokemons] = useState(pokemonsPlayer2)
    const [allPokemonsId, setAllPokemonsId] = useState([])
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const history = useHistory()

    const handleChangeSelectedCard = (id) => {
        if (finishGameType === 'win' && (!selectedCard || selectedCard.id === id)) {
            setPlayer2Pokemons(prevState => {
                let copyState = [...prevState]

                const newCopyState = copyState.map(item => {
                    if (item.id === id) {
                        if(!item.selected) {
                            return {
                                ...item,
                                selected : true
                            }

                        } else {
                            return {
                                ...item,
                                selected: !item.selected
                            }

                        }
                    }
                    return item
                })

                return newCopyState
            })
        }
    }

    const addPokemonToPlayerBase = async (data) => {
        const idToken = localStorage.getItem('idToken')
        await FirebaseClass.addPokemon(data, idToken, userIdLocal)

    }

    const handleClickButton = () => {
        if (selectedCard && allPokemonsId.indexOf(selectedCard.id) === -1) {
            const data = {...selectedCard}
            delete data.selected
            dispatch(cleanPokemonsData())

            addPokemonToPlayerBase(data)
        } else if (selectedCard && allPokemonsId.indexOf(selectedCard.id) !== -1) {
            setMessage('Такой покемон у Вас уже есть')
            setTimeout(() => setMessage(''), 1000)
        }
        
        history.replace('/game/')
    }

    useEffect(() => {

        setAllPokemonsId(Object.entries(allPokemonsPlayer1).map(([key, {id}]) => id))

        return () => {
            setAllPokemonsId([])
        }
    }, [allPokemonsPlayer1])


    useEffect(() => {

        for (let item of player2PokemonsData) {
            if (item.selected) {
                setSelectedCard(item)
            }
        }
        return () => setSelectedCard(null)
    },[player2PokemonsData])

    if (!pokemonsSelectedPlayer1 || !player2PokemonsData) {
        history.replace('/game/')
    }

    return (
        <div className={s.root}>

            <div className={s.flex}>
                {
                    Object.entries(pokemonsSelectedPlayer1).map(([key, {name, img, id, type, values}]) => (
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
                <button
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
                            onchangeActiveCard={(id) => handleChangeSelectedCard(id)}
                        />
                    ))
                }
            </div>

        </div>
    )
}

export default FinishPage