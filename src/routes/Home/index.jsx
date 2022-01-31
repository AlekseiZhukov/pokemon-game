import React, {useContext, useEffect, useState} from "react"
import Header from "../../components/Header"
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import bgImg1 from '../../assets/images/bg2.jpg'
import bgImg2 from '../../assets/images/bg1.jpg'
import {FireBaseContext} from "../../context/farebaseContext";
import s from './style.module.css'

function HomePage() {

    const [pokemons, setPokemons] = useState({})
    const firebase = useContext(FireBaseContext)

    const handleChangActiveCard = (key) => {

        setPokemons(prevState => {

            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === key) {
                    if(pokemon.active) {
                        pokemon.active = !pokemon.active;
                    } else {
                        pokemon.active = true
                    }

                };
                acc[item[0]] = pokemon;
                return acc;
            }, {});

        })
    }

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons)
        })
        return () => {
            firebase.offPokemonSoket()
        }

    }, [firebase])


    return (
        <>

            <Header title="This is title" descr="This is Description!" />

            <Layout
                id="rules"
                title="Rules"
                urlBg={bgImg1}
            >
                <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on
                    a 3x3 grid.</p>
                <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the
                    player's own color of red or blue.</p>
                <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board)
                    must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to
                    an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank
                    of the opponent's card is higher than the player's card, the player's card will be captured and turned into
                    the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into
                    the player's color instead. </p>
            </Layout>

            <Layout
                id="cards"
                title="Cards"
                colorBg="#e2e2e2"
            >
                <div className="flex">
                    {
                        Object.entries(pokemons).map(([key, item]) =>
                            <PokemonCard
                                className = {s.card}
                                key={key}
                                name={item.name}
                                img={item.img}
                                id={item.id}
                                type={item.type}
                                values={item.values}
                                isActive = {item.active}
                                onchangeActiveCard={ () => handleChangActiveCard(item.id)}


                            />
                        )
                    }
                </div>
            </Layout>

            <Layout
                id="about"
                title="Full Rules"
                urlBg={bgImg2}
            >
                <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on
                    a 3x3 grid.</p>
                <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the
                    player's own color of red or blue.</p>
                <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board)
                    must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to
                    an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank
                    of the opponent's card is higher than the player's card, the player's card will be captured and turned into
                    the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into
                    the player's color instead. </p>
            </Layout>


        </>
    );
}

export default HomePage;
