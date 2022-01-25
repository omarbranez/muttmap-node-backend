import React, { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getReports, toggleReportWindow } from '../actions/reportActions'
import { setGeolocatedCenter, resetCenter, setMarkerCenter } from '../actions/mapActions'
import { styled, useTheme } from '@mui/material/styles';
import GoogleMapReact from 'google-map-react/'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import MapMarker from '../components/map/mapMarker'
import MapReportButton from '../components/map/mapReportButton'
import MapCurrentLocationButton from '../components/map/mapCurrentLocationButton'
import MapDefaultLocationButton from '../components/map/mapDefaultLocationButton'
import MapLoadingSpinner from '../components/map/mapLoadingSpinner'
import ReactDOM from 'react-dom'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip'
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(1),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
    }),
  );
  
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const MapContainer = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const center = useRef()
    const mapRef = useRef()
    const theme = useTheme();
    
    const [open, setOpen] = useState(false);
    const [showReportButtonTooltip, setShowReportButtonTooltip] = useState(false)
    const [showReportListDetails, setShowReporListDetails] = useState(false)
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(15)
    const [filteredReports, setFilteredReports] = useState(null)

    useEffect(() => {
        dispatch(getReports())
    }, [dispatch])

    useEffect(() => {
        center.current = props.currentCenter
        // return resetCenter
    }, [center, resetCenter, props.currentCenter])

    useEffect(() => {
        if (mapRef.current) {
            const { map, maps } = mapRef.current
        }
    }, [mapRef])

    useEffect(()=>{
        return resetCenter()
    },[resetCenter])

    const filterReports = (reports, bounds) => {
        setFilteredReports(reports.filter(report => inBoundingBox(bounds[0], bounds[1], report.lat, report.lng)))
    }

    useEffect(() => {
        bounds && filterReports(props.reports, bounds)
    }, [bounds, props.reports ])

    const handleOnLoad = ({ map, maps }) => { // this is the only way to add controls to google maps api
        mapRef.current = { map, maps }

        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { navigate('/reports/new') })
        ReactDOM.render(<MapReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(controlButtonDiv)

        const currentLocationButtonDiv = document.createElement('div')
        currentLocationButtonDiv.addEventListener('click', () => { props.setGeolocatedCenter() })
        ReactDOM.render(<MapCurrentLocationButton />, currentLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(currentLocationButtonDiv)

        const defaultLocationButtonDiv = document.createElement('div')
        defaultLocationButtonDiv.addEventListener('click', () => { props.resetCenter() })
        ReactDOM.render(<MapDefaultLocationButton />, defaultLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(defaultLocationButtonDiv)

        const openListButtonDiv = document.createElement('div')
        openListButtonDiv.addEventListener('click', handleDrawerOpen)
        ReactDOM.render(
            <IconButton sx={{ ...(open && { display: 'none' }) }}  
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onMouseEnter={()=>setShowReportButtonTooltip(true)}
                        onMouseLeave={()=>setShowReportButtonTooltip(false)}
                        onClick={()=>setShowReportButtonTooltip(false)}> 
                <img src="./report-list-icon.png" width="60"></img>  
            </IconButton>, openListButtonDiv)
        map.controls[maps.ControlPosition.TOP_RIGHT].push(openListButtonDiv)

        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const markers = props.reports && props.reports.map((report, i) => {
            const lat = report.lat
            const lng = report.lng
            const location = { lat, lng }
            // console.log(report)console.log
            // console.log(location) 
            return new maps.Marker({position: location, label: labels[i % labels.length]})
        })

        for (const marker of markers) {
            maps.event.addListener(marker, 'click', function() {
                map.setZoom(18)
                map.setCenter(marker.getPosition())
            })
        }

        new MarkerClusterer({map, markers})
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleListItemClick = (lat, lng) => {
        // console.log(handleOnLoad(lat, lng))
        props.setMarkerCenter(lat, lng)
        setZoom(16)
    }
    
    const inBoundingBox = (sw, ne, rLat, rLng) => {
        if (sw && ne && rLat && rLng) { 
        let isLngInRange
        if (ne.lng < sw.lng) {
            isLngInRange = rLng >= sw.lng || rLng <= ne.lng
        } else {
            isLngInRange = rLng >= sw.lng && rLng <= ne.lng
        }
        return (
            rLat >= sw.lat && rLat <= ne.lat && isLngInRange
        )
        } else {
            return false
        }
    }
    function isEmpty(str) {
        return (!str || str.length === 0 );
    }

    const renderMap = () => 
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Main open={open} sx={{ height: [null, null, 680], zIndex: 1 }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                        center={props.currentCenter}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={handleOnLoad}
                        onChange={({ zoom, bounds }) => {
                            setZoom(zoom)
                            setBounds([
                                bounds.sw,
                                bounds.ne,
                            ])
                        }}
                        options={{ fullscreenControl: false }}
                        onChildClick={(e) => { props.toggleReportWindow(e) }}>
                        {props.geolocating ? <MapLoadingSpinner text={"Locating"} /> : null}
                        {props.reports ? props.reports.map((report) => <MapMarker
                            key={report.id}
                            id={report.id}
                            key={report.id}
                            lat={report.lat}
                            lng={report.lng}
                            text={report.name}
                            show={report.show}
                            breed={report.breed}
                            timeCreated={report.time_created}
                            name={report.name} 
                            zIndex={2}
                            style={{height: 40, width:20}}/>) : <MapLoadingSpinner text="Loading"/>}
                    </GoogleMapReact>
                </Main>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                > 
                {/* this is covered by the app bar */}
                    <DrawerHeader> 
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                {/* this is covered by the app bar */}
                    <DrawerHeader>
                    <Tooltip title='Click here to see a list of reports!' placement='left' open={showReportButtonTooltip} disableHoverListener disableFocusListener>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        </Tooltip>
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {!isEmpty(filteredReports) ? filteredReports.map((report, index) => (
                            <Tooltip key={report.id} title={report.created} placement='left' open={showReportListDetails} disableHoverListener disableFocusListener>
                            <ListItem button key={report.id} onMouseEnter={()=>setShowReporListDetails(true)} onMouseLeave={()=>setShowReporListDetails(false)} onClick={()=>setShowReporListDetails(false)}>
                                <ListItemAvatar>
                                    <Avatar alt={report.breed} src={`dog-icons/${report.breed}.png`} variant="square" sx={{ width: [null, null, 36] }} />
                                </ListItemAvatar>
                                <ListItemText primary={report.breed} secondary={report.name} onClick={(e) => handleListItemClick(report.lat, report.lng)}>

                                </ListItemText>
                            </ListItem>
                            </Tooltip>
                        )) : <ListItem>
                                <ListItemText primary="No Reports Found Here. Zoom Out or Pan Around to See More!"></ListItemText>
                            </ListItem>}
                    </List>
                </Drawer>
            </Box>
        </div>
    
  return props.loading === false && props.currentCenter ? !props.geolocating ? renderMap() : <MapLoadingSpinner text={"Locating"}/> : <MapLoadingSpinner text={"Loading"}/>

  
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    userCenter: state.user.defaultCenter,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    loading: state.reports.loading,
    user: state.user   
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setGeolocatedCenter, setMarkerCenter, resetCenter })(MapContainer)