
class Firebase {

    constructor() {
        this.host = 'https://pokemon-game-e19b3-default-rtdb.firebaseio.com';
        this.localId = null;
    }

    token = () => localStorage.getItem('idToken');

    setLocalId = (localId) => {
        this.localId = localId;
    }

    checkLocalId () {
        if (!this.localId) {
            // eslint-disable-next-line no-throw-literal
            throw {
                msg: 'LocalId is doesn\'t exist'
            }
        }
    }

    getPokemons = async () => {
        try {
            this.checkLocalId()
            const res = await fetch(`${this.host}/${this.localId}/pokemons.json?auth=${this.token()}`)
                .then(res => res.json)
            return res
        } catch (error) {
            console.error(error)
        }
    }

    addPokemon = async (data, idToken, localId) => {

        try {
            this.setLocalId(localId)
            this.checkLocalId()
            const res = await fetch(`${this.host}/${this.localId}/pokemons.json?auth=${idToken}`,{
                method: 'POST',
                body: JSON.stringify(data)
            }).then(res => res.json)

            return res
        } catch (error) {
            console.error(error)
        }
    }


}

const FirebaseClass = new Firebase()

export default FirebaseClass

