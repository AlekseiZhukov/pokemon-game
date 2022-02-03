import React, {useState} from "react";
import {useRouteMatch, Switch, Route} from 'react-router-dom'
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import {PokemonContext} from "../../context/pokemonContext";



const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({})
    const [player2Pokemons, setPlayer2Pokemons] = useState(null)

    const match = useRouteMatch();

    const handleSelectedPokemons = (key, pokemon) => {

        setSelectedPokemons(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState}
                delete copyState[key]
                return copyState
            }
            return {
                ...prevState,
                [key]: pokemon
            }
        })

    }

    const handleAddPlayer2Pokemons = (pokemonsPlayer2) => {

        setPlayer2Pokemons(pokemonsPlayer2)
    }
     const handleCleanContext = () => {
         setSelectedPokemons({})
     }

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            player2Pokemons: player2Pokemons,
            onSelectedPokemons: handleSelectedPokemons,
            onCleanContext: handleCleanContext,
            onAddPlayer2Pokemons: handleAddPlayer2Pokemons
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage