const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const location = localStorage.getItem('location')
const initialState = {

    user: JSON.parse(user) || null,
    token: token || null,
    location: location || null,
    defaultLocation: {
        lat: null,
        lng: null
    },
    currentLocation: { 
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
        case "SET_USER":
            console.log(action.payload)
            return {...state, user: action.payload.user.username, token: action.payload.user.token, defaultLocation: { lat: action.payload.location[0], lng: action.payload.location[1] }}
        case "SET_DEFAULT_CENTER":
            return {
                ...state,
                currentLocation: {
                    lat: state.defaultLocation.lat,
                    lng: state.defaultLocation.lng,
                }
            }
        case "SET_NEW_CENTER":
            return { ...state, ...action.payload }
        case "CURRENTLY_GEOLOCATING":
            return {...state, geolocating: true}
        case "FINISHED_GEOLOCATING":
            return {...state, geolocating: false}
        case "LOGOUT":
            return {...initialState, user: null, token: null, location: null}
        default:
            return {...state}
    }
}

export default userReducer