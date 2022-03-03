import axios from 'axios'

const BASE_URL = "http://localhost:3000/"

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
