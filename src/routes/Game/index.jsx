import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {pokemons} from '../../data/pokemons'
import PokemonCard from "../../components/PokemonCard";



const GamePage = () => {

    const history = useHistory()
    const [pokemonsData, setPokemonsData] = useState(pokemons)

    const onchangeActiveCard = (id) => {

        setPokemonsData(prevState => prevState.map(p => p.id === id ? {...p, active: !p.active} : p))

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
                <h1>
                    This is Game Page!!!
                </h1>
                <div className="flex">
                {
                    pokemonsData.map(item =>  <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={item.active}
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