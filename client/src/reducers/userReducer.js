
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')),
    location: JSON.parse(localStorage.getItem('location')) || '',
    defaultCenter: {
        lat: null,
        lng: null
    },
    currentCenter: { 
        lat: null,
        lng: null,
    },
    geolocating: false,
}

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOGIN_FORM_CENTER_CHANGE":
            return {...state, loginForm: {
                ...state.loginForm,
                lat: action.payload.lat,
                lng: action.payload.lng,
            }}
        // case "SET_USER":
        //     // console.log(action.payload.lat)
        //     return {...state, ...action.payload,
        //     defaultCenter: {
        //         lat: action.payload.lat,
        //         lng: action.payload.lng
        //     },
        //     currentCenter: {
        //         lat: action.payload.lat,
        //         lng: action.payload.lng,
        //     }}
        case "SET_USER":
            return {...state, user: action.payload.user, token: action.payload.token, location: action.payload.location }
        case "SET_DEFAULT_CENTER":
            return {
                ...state,
                currentCenter: {
                    lat: state.defaultCenter.lat,
                    lng: state.defaultCenter.lng,
                }
            }
        case "SET_NEW_CENTER":
            return { ...state, ...action.payload }
        case "CURRENTLY_GEOLOCATING":
            return {...state, geolocating: true}
        case "FINISHED_GEOLOCATING":
            return {...state, geolocating: false}
        case "LOGOUT":
            return {...initialState, user: null, token: null, location: ''}
        default:
            return {...state}
    }
}

export default userReducer