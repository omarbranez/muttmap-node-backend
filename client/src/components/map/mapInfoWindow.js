import React from 'react'
import { Link } from "react-router-dom"
import { resetCenter } from '../../actions/mapActions'
import { useDispatch } from 'react-redux'
import { toggleReportWindow } from '../../actions/reportActions'

const MapInfoWindow = (props) => {

    const {id, name, breed, timeCreated} = props.report
    const dispatch = useDispatch()

    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    }

    return (
        <div style={infoWindowStyle} id={id}>
          <div>
            <button style={{float: 'right'}} onClick={()=> dispatch(toggleReportWindow(id))}>X</button>
          </div>
          <div style={{ fontSize: 16 }}>
            {name}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {breed}
          </div>
          <div style={{ fontSize: 14, color: 'grey' }}>
            {timeCreated}
          </div>
          <Link to={`/reports/${id}`}>
            <button onClick={()=>dispatch(resetCenter())}>Click to see Report Details</button>
          </Link>
        </div>
      )
}

export default MapInfoWindow