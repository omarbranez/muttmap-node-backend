import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const MapOpenListButton = (props) => {

    
    const [open, setOpen] = useState(false)
    console.log(open)
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='openListButton' src='../report-list-icon.jpg' alt='open list button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div>
            <Tooltip title='Click here to see a list of reports!' placement='left' open={open} disableHoverListener disableFocusListener>
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 

export default MapOpenListButton