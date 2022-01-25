import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getReports } from '../actions/reportActions'
import { DataGrid, GridToolbarFilterButton} from '@mui/x-data-grid'

import muttmapNewsFeed from '../muttmap-news-feed.png'

const ReportsContainer = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ sortDate, setSortDate ] = useState([{field: 'created', sort: 'desc'}])

    const columns = [
        { field: 'date', headerName: 'Date Reported', width: 200, filterable: false },
        { field: 'time', headerName: 'Time Reported', width: 200, filterable: false},
        { field: 'name', headerName: 'Dog Name', width: 150, filterable: false },
        { field: 'breed', headerName: 'Dog Breed', width: 200 },
        { field: 'created', type: 'dateTime', width: 200, filterable: false},
    ]

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    const handleClick = (e) => {
        console.log(e.id)
        navigate(`/reports/${e.id}`)
    }
    return (
        <div>
            <img src={muttmapNewsFeed} width="400"></img>
            <h2>IS THERE A DOG NEAR YOU? IS IT AMAZING? SHARE IT WITH US!</h2>
            <Link to="/reports/new"><button className='welcomeButton'>New Dog Report</button></Link>
            <br/>
            <br/>
            {!(props.reports.loading) ? <DataGrid 
                components={{ Toolbar: GridToolbarFilterButton, }}
                sortingOrder={['desc', 'asc']}
                sortModel={sortDate}
                rows={props.reports.map((report) => ({id: report.id, date: report.date_created, time: report.time_created, name: report.name, breed: report.breed, created: report.created}))}
                columns={columns}
                onSortModelChange={(report) => setSortDate(report)}
                onCellClick={(e) => handleClick(e)}
            /> : <h2>Loading</h2>}
        </div>
    )
}


const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    user: state.user,
})

export default connect(mapStateToProps, { getReports })(ReportsContainer)