import axios from 'axios'

const BASE_URL = "http://localhost:3000/"

export const handleLoginFormChange = (e) => ({
    type: "LOGIN_FORM_CHANGE",
    payload: {name: e.target.name, value: e.target.value}
})

export const getLatLngOutput = (lat, lng) => ({
    type: "LOGIN_FORM_CENTER_CHANGE",
    payload: {lat, lng}
})

export const authUser = (formData, dispatch, endpoint) => {
  return async(dispatch) => {
    const { data } = await axios.post(`/api/v1/auth/${endpoint}`, formData)
    const { user, token, location} = data
    dispatch({
      type: "SET_USER",
      payload: { user, token, location }
    })
    addUserToLocalStorage({ user, token, location })
  }
}

export const autoLoginUser = () => {
    return dispatch => fetch(BASE_URL + "/autologin", {
        headers: {
            'Authorization': localStorage.token
        }
    })
    .then(res => handleUserResponse(res, dispatch))
  }

export const logoutUser = (dispatch) => {
  dispatch({type: "LOGOUT" })
  removeUserFromLocalStorage()
}

const addUserToLocalStorage = ({ user, token, location }) => {
  console.log(token)
  console.log(location)
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', `${location.lat}, ${location.lng}`)
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('location')
}

const handleUserResponse = (res, dispatch) => {
    if (res.ok) {
      res.json()
      .then(response => {

        localStorage.token = response.token
        dispatch({type: "SET_USER", payload: response.user})
      })
    } else {
      res.json()
      .then(res => alert(res.errors))
    }
  }