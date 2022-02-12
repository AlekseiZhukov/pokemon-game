import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import PlayerBoard from "./component/PlayerBoard";
import Result from "../../../../components/Result";
import {useSelector, useDispatch} from "react-redux";
import {
    selectedPokemonsPlayer1,
    loading,
    addPlayer2Pokemons, setTypeFinishedGame, typeFinishedGame
} from "../../../../store/selectedPokemons";
import ArrowChoice from "../../../../components/ArrowChoice";
import request from '../../../../service/request'

import {counterWin, returnBoard, randomNumberPlayer} from "../../../../Utils";
import {selectPokemonsData} from "../../../../store/pokemons";

const BoardPage = () => {

    const history = useHistory()
    const pokemonsPlayer1 = useSelector(selectedPokemonsPlayer1)
    const pokemonsSelector = useSelector(selectPokemonsData)

    if (Object.keys(pokemonsPlayer1).length === 0) {
        history.replace('/game')
    }

    const [startPlayer, setStartPlayer] = useState(0)
    const [board, setBoard] = useState([])
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemonsPlayer1).map(item => ({
            ...item,
            possession: 'blue',
        }))
    })
    const [player2, setPlayer2] = useState([])
    const [choiceCard, setChoiceCard] = useState(null)
    const [steps, setSteps] = useState(0)
    const dispatch = useDispatch()
    const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const fetchingData = useSelector(loading)
    const [showArrow, setShowArrow] = useState(true)
    const finishGameType =  useSelector(typeFinishedGame)

    const choiceStartPlayer = useCallback(() => {
        setTimeout(() => {
            setStartPlayer(randomNumberPlayer())
            //setStartGame(true)
        }, 2000)

    }, [])

    useEffect( () => {

        async function fetchData () {

            const boardResponse = await request.getBoard()
            setBoard(boardResponse.data)

            const player2Request = await request.gameStart({
                pokemons: Object.values(pokemonsSelector),
            })

            dispatch(addPlayer2Pokemons(player2Request.data))

            player2Request.data &&  setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: 'red',
                }))
            })
        }

        fetchData()
        choiceStartPlayer()


        return () => {
            setBoard([]);
            setPlayer2([])
        }

    }, [dispatch, choiceStartPlayer, history, pokemonsPlayer1, pokemonsSelector])


    useEffect( () => {
        if(startPlayer === 2) {
            async function moveAi() {
                const params = {
                    currentPlayer: 'p2',
                    hands: {
                        p1: player1,
                        p2: player2
                    },
                    move: null,
                    board: serverBoard,
                };


                const game = await request.game(params)
                const idAi = game.move.poke.id

                setTimeout(() => {
                    setPlayer2(prevState => prevState.map(item => {
                        if (item.id === idAi) {
                            return {
                                ...item,
                                active: true
                            }
                        }
                        return item
                    }));
                }, 1000)

                setTimeout(() => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke))
                    setServerBoard(game.board)
                    setBoard(returnBoard(game.board))
                    setSteps(prevState => prevState + 1)
                    setShowArrow(false)

                }, 1500)
            }

            moveAi()

            setTimeout(() => {
                setShowArrow(false)
                setStartPlayer(1)
            } ,1499 )
        }


    }, [startPlayer, player1, player2, serverBoard])



    const handleClickBoardPlate = async (position) => {
        setShowArrow(false)

        if (typeof choiceCard === 'object') {
            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: {
                    poke: {
                        ...choiceCard
                    },
                    position
                },
                board: serverBoard
            };

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(prevState => prevState.map(item => {
                if(item.position === position) {
                    return {
                        ...item,
                        card: choiceCard
                    }
                }
                return item
            }));



            const game = await request.game(params)

            setBoard(returnBoard(game.oldBoard))

            setSteps(prevState => prevState + 1)

            if (game.move !== null) {
                const idAi = game.move.poke.id

                setTimeout(() => {
                    setPlayer2(prevState => prevState.map(item => {
                        if (item.id === idAi) {
                            return {
                                ...item,
                                active: true
                            }
                        }
                        return item
                    } ));
                }, 1000)

                setTimeout(() => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke))
                    setServerBoard(game.board)
                    setBoard(returnBoard(game.board))
                    setSteps(prevState => prevState + 1)
                }, 1500)
            }
        }
    }

    useEffect( () => {

        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2)

            if(count1 > count2) {
                dispatch(setTypeFinishedGame('win'))
            } else if (count1 < count2) {
                dispatch(setTypeFinishedGame('lose'))
            } else {
                dispatch(setTypeFinishedGame('draw'))
            }

            setTimeout(() => history.replace('/game/finish'), 3000)
        }
    }, [steps, board, player1, player2, history, dispatch])

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
                { showArrow && <ArrowChoice side = {startPlayer}/>}
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => (!item.card && choiceCard) && handleClickBoardPlate(item.position)}
                        >

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
                    startPlayer = {startPlayer}
                />
            </div>
            { finishGameType ? <Result type={finishGameType} /> : null}
        </div>
    );
};

export default BoardPage;
