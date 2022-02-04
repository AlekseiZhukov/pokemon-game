import React, {useState} from "react";
import cn from 'classnames'
import PokemonCard from "../../../../../../components/PokemonCard";
import s from "./style.module.css";



const PlayerBoard = ({player, cards, onClickCard, startPlayer}) => {
    const [isSelected, setSelected] = useState(null)

    const handleOnClick = (item) => {
        if (startPlayer === player) {
            setSelected(item.id)
            onClickCard && onClickCard({
                player,
                ...item,

            })
        }
    }

    return (
        <>
            {
                cards.map((item) => (
                    <div key = {item.id} className={cn(s.cardBoard, {
                        [s.selected]:isSelected === item.id
                    })}
                         onClick={() =>  handleOnClick(item) }
                    >
                        <PokemonCard
                            className={s.card}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive
                            minimize
                        />
                    </div>
                ))
            }
        </>
    )
}

export default PlayerBoard