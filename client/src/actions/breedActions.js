const BREEDS_URL = 'http://localhost:3000/dogs'

export const getBreeds = () => {
    // debugger
    return dispatch => {
        dispatch({type: "LOADING_BREEDS"})
        fetch(BREEDS_URL, {
            header: 'Access-Control-Allow-Origin'
        })
        .then(res => res.json())
        .then(responseJSON => dispatch({
            type: "SHOW_BREEDS",
            payload: responseJSON,
        }))

    }
}
