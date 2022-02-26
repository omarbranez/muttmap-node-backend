// export const setGeolocatedLocation = () => {
//   return dispatch => { // try watchPosition
//     dispatch({ type: "CURRENTLY_GEOLOCATING" })
//     navigator.geolocation.getCurrentPosition(position => {
//       dispatch({
//         type: "SET_NEW_CENTER", payload: {
//           currentLocation: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           }
//         }
//       })
//       dispatch({ type: "FINISHED_GEOLOCATING"})
//     })
//   }
// }

export const setGeolocatedLocation = async(dispatch) => {
  dispatch({ type: "CURRENTLY_GEOLOCATING" })
    try {
      let {coords} = await getPosition()            
      dispatch({
        type: "SET_NEW_CENTER",
        payload: {
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
        }}
      })
  } catch(error) {
      console.log(error)
  }finally {
      dispatch({ type: "FINISHED_GEOLOCATING"})
  }
}

export const setMarkerLocation = (markerLat, markerLng) => ({
  type: "SET_NEW_CENTER",
  payload: {
    currentLocation: {
      lat: markerLat,
      lng: markerLng,
    }
  }
})

export const resetLocation = () => ({
  type: "SET_DEFAULT_CENTER"
})

const getPosition = () => {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

// const handleUseCurrentLocation = async() => {
//   try {
//       let {coords} = await getPosition()            
//       const res = await fetch(`https://atlas.microsoft.com/search/address/reverse/json?subscription-key=${process.env.REACT_APP_AZURE_SUB_KEY}&api-version=1.0&query=${coords.latitude},${coords.longitude}`)
//       .then(res => res.json())
//       .then(res => setValues({...values, locationCity: res.addresses[0].address.localName, locationZip: res.addresses[0].address.postalCode, lat: coords.latitude, lng: coords.longitude}))
//   } catch(error) {
//       console.error(error)
//   }
// }