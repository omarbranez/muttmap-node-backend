import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import ReportMapMarker from './reportMapMarker'

const ReportFormMap = (props) => {
    const [ coordinates, setCoordinates ] = useState(null)
    const [ showConfirmButton, setShowConfirmButton] = useState(false)

    const handleMapClick = (e) => {
        setCoordinates({lat: e.lat, lng: e.lng})
        setShowConfirmButton(true)
        props.sendMapToForm({lat: e.lat, lng: e.lng})

    }

    const handleConfirmClick = () => {
        setShowConfirmButton(!showConfirmButton)
        props.confirmClicked()
    }

    return(
        <div style={{ height: '300px', width: '500px' }}>
            {(props.mapLoading === false) ?
                <GoogleMapReact
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                    center={props.mapCoordinates}
                    defaultZoom={14}
                    onClick={handleMapClick}
                    options={{fullscreenControl: false}}
                    >
                {coordinates && <ReportMapMarker lat={coordinates.lat} lng={coordinates.lng}/>}
                </GoogleMapReact>
            : <h2>Loading</h2>}
            {showConfirmButton ? <input type="button" value="Confirm Location" onClick={handleConfirmClick}/> : null }
        </div>
    )
}

export default ReportFormMap