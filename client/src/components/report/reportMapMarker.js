const ReportMapMarker = () => {
    return(
        <div>
            <img src={process.env.PUBLIC_URL + "/location-pin.png"} height='60rem' style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}></img>
        </div>
    )
}

export default ReportMapMarker