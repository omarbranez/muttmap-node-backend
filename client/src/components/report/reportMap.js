import React from 'react'
import GoogleMapReact from 'google-map-react'
import ReportMapMarker from './reportMapMarker' 

const ReportMap = (props) => {
    const {lat, lng} = props
    return(
        <div style={{ height: '200px', width: '200px', display: "flex", justifyContent: "center", alignItems: "center", margin: 'auto'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}`}}
                center={[lat, lng]}
                zoom={15}
                options={{fullscreenControl: false, gestureHandling: 'none'}}>
                <ReportMapMarker lat={lat} lng={lng}/>
            </GoogleMapReact>
        </div>
    )
}

export default ReportMap