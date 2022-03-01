import React, {useState} from 'react'
import Tooltip from '@mui/material/Tooltip'

const MapReportListButton = () => {
    const [open, setOpen] = useState(false)
    
    const Button = React.forwardRef(function Button(props, ref){
        return <div {...props} ref={ref}><img className='reportListButton' width="60" src='../report-list-icon.png' alt='report list button'></img></div>})
    
    const handleClick = () => {
        setOpen(false)
    }
    
    return (
        <div style={{marginTop: "5vh"}}>
            <Tooltip title='Click here to see a list of reports!' placement='top-start' >
                <Button onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)} onClick={handleClick}/>
            </Tooltip>
        </div>
    )
} 
{/* <IconButton sx={{ ...(open && { display: 'none' }) }}  
color="inherit"
aria-label="open drawer"
// edge="end"
onMouseEnter={()=>setShowReportButtonTooltip(true)}
onMouseLeave={()=>setShowReportButtonTooltip(false)}
onClick={()=>setShowReportButtonTooltip(false)}> 
<img src="./report-list-icon.png" width="60"></img>  
</IconButton> */}

export default MapReportListButton
