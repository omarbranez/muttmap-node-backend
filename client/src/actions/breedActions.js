import axios from 'axios'

const BASE_URL = "http://localhost:3000/"

// export const getBreeds = () => {
//     // debugger
//     return dispatch => {
//         dispatch({type: "LOADING_BREEDS"})
//         fetch(BREEDS_URL, {
//             header: 'Access-Control-Allow-Origin'
//         })
//         .then(res => res.json())
//         .then(responseJSON => dispatch({
//             type: "SHOW_BREEDS",
//             payload: responseJSON,
//         }))

//     }
// }

export const getBreeds = async(dispatch) => {
    dispatch({ type: "LOADING_BREEDS" })
    try {
        const {data} = await axios.get(`/api/v1/breeds`)
        const {breeds} = data
        dispatch({
            type: "SHOW_BREEDS",
            payload: breeds
        })
    } catch (error){
        console.log(error)
    } 
}
