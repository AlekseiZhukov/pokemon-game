export const counterWin = (board, player1, player2) => {
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

export const returnBoard = (board) => {
    return board.map((item, index) => {
        let card = null;
        if (typeof item === 'object') {
            card = {
                ...item.poke,
                possession: item.holder === 'p1' ? 'blue' : 'red'

            }
        }
        return {
            position: index +1,
            card,
        }

    })
}

export const randomNumberPlayer = () => {
    return Math.floor(Math.random()*2) + 1
}