import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const MapReportButton = (props) => {

    
    const [open, setOpen] = useState(false)
    
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='reportButton' src='../reportButton.png' alt='report button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div>
            <Tooltip title='Click here to report a new dog sighting!' placement='top-start' open={open} disableHoverListener disableFocusListener={true}>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick} />
            </Tooltip>
        </div>
    )
} 

export default MapReportButton