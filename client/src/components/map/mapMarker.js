import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MapInfoWindow from './mapInfoWindow'

import '../../marker.css'

const MapMarker = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const [opened, setOpened] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleOpened = () => {
    setOpened(!opened)
  }
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
      {opened ? <MapInfoWindow key={props._id} report={props} clickable={true} handleOpened={handleOpened}/> : null}
    </div>
  )
}

export default MapMarker
