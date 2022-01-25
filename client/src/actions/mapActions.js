export const setGeolocatedCenter = () => {
  return dispatch => { // try watchPosition
    dispatch({ type: "CURRENTLY_GEOLOCATING" })
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({
        type: "SET_NEW_CENTER", payload: {
          currentCenter: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }
      })
      dispatch({ type: "FINISHED_GEOLOCATING"})
    })
  }
}

export const setMarkerCenter = (markerLat, markerLng) => ({
  type: "SET_NEW_CENTER",
  payload: {
    currentCenter: {
      lat: markerLat,
      lng: markerLng,
    }
  }
})

export const resetCenter = () => ({
  type: "SET_DEFAULT_CENTER"
})
