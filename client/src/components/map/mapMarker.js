import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MapInfoWindow from './mapInfoWindow'

import '../../marker.css'

const MapMarker = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
      {props.show === true ? <MapInfoWindow key={props.id} report={props} clickable={true}/> : null}
    </div>
  )
}

export default MapMarker
