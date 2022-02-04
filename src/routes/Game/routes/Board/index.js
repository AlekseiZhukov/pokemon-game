import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import PlayerBoard from "./component/PlayerBoard";
import Result from "../../../../components/Result";
import {useSelector, useDispatch} from "react-redux";
import {getPokemonsPlayer2Async, player2Pokemons, selectedPokemons, loading} from "../../../../store/selectedPokemons";
import ArrowChoice from "../../../../components/ArrowChoice";

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length
    let player2Count = player2.length

    board.forEach(item => {
        if (item.card.possession === "red") {
            player2Count++
        }

        if (item.card.possession === "blue") {
            player1Count++
        }
    })

    return [player1Count, player2Count]
}


const BoardPage = () => {
    const dispatch = useDispatch()
    const pokemons = useSelector(selectedPokemons)
    const pokemonsPlayer2 = useSelector(player2Pokemons)
    const fetchingData = useSelector(loading)
    const [board, setBoard] = useState([])
    const [startPlayer, setStartPlayer] = useState(null)
    const [startGame, setStartGame] = useState(false)
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))
    })
    const [player2, setPlayer2] = useState([])
    const [choiceCard, setChoiceCard] = useState(null)
    const [steps, setSteps] = useState(0)
    const [typeFinishedGame, setTypeFinishedGame] = useState(null)
    const history = useHistory()

    const randomNumberPlayer = () => {
        return Math.floor(Math.random()*2) + 1
    }
    const choiceStartPlayer = useCallback(() => {
        setTimeout(() => {
            setStartPlayer(randomNumberPlayer())
            setStartGame(true)
        }, 2000)

    }, [])

    useEffect( () => {

        async function fetchData () {

            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
            const boardRequest = await boardResponse.json()
            setBoard(boardRequest.data)
            choiceStartPlayer()
        }
        fetchData()
        dispatch(getPokemonsPlayer2Async())

        return () => {
            setBoard([]);
        }

    }, [dispatch, choiceStartPlayer])

    useEffect( () => {
        pokemonsPlayer2 && setPlayer2( () => {
            return pokemonsPlayer2.map( item => ({
                ...item,
                possession: 'red',
            }))
        })

    }, [pokemonsPlayer2] )

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game')
    }

    const handleClickBoardPlate = async (position) => {

        if (choiceCard && startPlayer === 1){
            setStartPlayer(2)
        } else if (choiceCard && startPlayer === 2) {
            setStartPlayer(1)
        }

        if(choiceCard ) {
            const params = {
                position,
                card: choiceCard,
                board,
            }

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }
            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(request.data)
            setSteps(prevState => prevState + 1)
            setChoiceCard(null)
        }
    }

    useEffect( () => {

        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2)

            if(count1 > count2) {
                setTypeFinishedGame('win')
                setTimeout(() => history.replace('/game/finish'), 3000)
            } else if (count1 < count2) {
                setTypeFinishedGame('lose')
                setTimeout(() => history.replace('/game/'), 3000)
            } else {
                setTypeFinishedGame('draw')
                setTimeout(() => history.replace('/game/'), 3000)
            }
        }
    }, [steps, board, player1, player2, history])

    if (fetchingData) {
        return <h1>LOADING...</h1>
    }

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards ={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                    startPlayer ={startPlayer}
                />

            </div>
            <div className={s.board}>
                <ArrowChoice side = {startPlayer} stop={startGame}/>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handleClickBoardPlate(item.position)}
                        >
                            {item.position}
                            {
                                item.card && <PokemonCard className = {s.card} {...item.card} isActive minimize/>
                            }
                        </div>
                    ))
                }

            </div>
            <div className={s.playerTwo}>

                <PlayerBoard
                    player={2}
                    cards ={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                    startPlayer = {startPlayer}
                />
            </div>
            { typeFinishedGame ? <Result type={typeFinishedGame} /> : null}
        </div>
    );
};

export default BoardPage;
