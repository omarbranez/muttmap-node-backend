const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const uiReducer = (state=initialState, action) => {
    switch(action.type){
        default:
            return {...state}
    }
}

export default uiReducer