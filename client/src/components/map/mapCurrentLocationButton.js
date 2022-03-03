import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const MapCurrentLocationButton = (props) => {

    const [open, setOpen] = useState(false)
    
    // console.log(open)
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='currentLocationButton' src='../currentLocationButton.jpg' alt='current location button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    // changing tooltip options OR back button disables autologin ?
    return (
        <div style={{cursor: "pointer"}}>
            <Tooltip title='Click here to find your current location!' placement='top-start' open={open} disableFocusListener={true}>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 

export default MapCurrentLocationButton