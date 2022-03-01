import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const MapDefaultLocationButton = (props) => {

    
    const [open, setOpen] = useState(false)
    
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='defaultLocationButton' src='../doghouse.png' alt='default location button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div>
            <Tooltip title='Click here to return to your home location!' placement='top-start'   disableFocusListener={true}>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 

export default MapDefaultLocationButton