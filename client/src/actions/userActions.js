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

// export const createUser = (formData, navigate) => {
//     console.log(formData)
//     return dispatch => {
//         (fetch(BASE_URL + "/users", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData),
//         }))
//         .then(res => handleUserResponse(res, dispatch))
//         .then(navigate('/login/success', {replace: true}))
//     }
// }

export const createUser = async({ formData }, dispatch) => {
  console.log(formData)
  try {
    const { data } = await axios.post(`/api/v1/auth/register`, formData)
    const { user, token, location } = data
    dispatch({
      type: "SET_USER",
      payload: { user, token, location }
    })
    addUserToLocalStorage({ user, token, location })
  } catch (error) {
      console.log(error)
  }
}

export const loginUser = async({ formData }, dispatch) => {
  console.log(formData)
  try {
    const { data } = await axios.post(`/api/v1/auth/register`, formData)
    const { user, token, location } = data
    dispatch({
      type: "SET_USER",
      payload: { user, token, location }
    })
    addUserToLocalStorage({ user, token, location })
  } catch (error) {
      console.log(error)
  }
}

// export const loginUser = (formData, navigate) => {
//     return dispatch => fetch(BASE_URL + "/sessions", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//       .then(res => handleUserResponse(res, dispatch))
//       .then(navigate('/login/success', {replace: true}))
//     }

export const autoLoginUser = () => {
    return dispatch => fetch(BASE_URL + "/autologin", {
        headers: {
            'Authorization': localStorage.token
        }
    })
    .then(res => handleUserResponse(res, dispatch))
  }

// export const logoutUser = (navigate) => {
//     return dispatch => {
//         localStorage.clear("token")
//         dispatch({type: "LOGOUT"})
//         navigate('/welcome', {replace: true})
//     }
// }

export const logoutUser = (dispatch) => {
  dispatch({type: "LOGOUT" })
  removeUserFromLocalStorage()
}

const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', location)
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
          // console.log(response)
          // console.log(response.user)
        localStorage.token = response.token
        dispatch({type: "SET_USER", payload: response.user})
      })
    } else {
      res.json()
      .then(res => alert(res.errors))
    }
  }