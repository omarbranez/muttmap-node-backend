const breedReducer = (state = {breeds: [], loading: false }, action) => {
    switch(action.type){
        case "LOADING_BREEDS":
            return {
                ...state,
                breeds: [...state.breeds],
                loading: true,
            }
        case "SHOW_BREEDS":
            return {
                ...state, 
                breeds: action.payload,
                loading: false,
            }
        default: 
            return {...state}
    }
}

export default breedReducer
