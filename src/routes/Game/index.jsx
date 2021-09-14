import React from "react";

const GamePage = ({onChangePage}) => {

    const handleClick = () => {
        onChangePage("app")
    }

    return (
        <div >
            This is Game Page!!!
            <div>
                <button onClick={handleClick}>return Home Page</button>
            </div>
        </div>
    )
}

export default GamePage