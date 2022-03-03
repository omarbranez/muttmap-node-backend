import React, { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getReports, toggleReportWindow } from '../actions/reportActions'
import { setGeolocatedLocation, resetLocation, setMarkerLocation } from '../actions/mapActions'
import { styled, useTheme } from '@mui/material/styles';
import GoogleMapReact from 'google-map-react/'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
// import MapMarker from '../components/map/mapMarker'
import MapReportButton from '../components/map/mapReportButton'
import MapCurrentLocationButton from '../components/map/mapCurrentLocationButton'
import MapDefaultLocationButton from '../components/map/mapDefaultLocationButton'
import MapReportListButton from '../components/map/mapReportListButton'
import MapLoadingSpinner from '../components/map/mapLoadingSpinner'
import ReactDOM from 'react-dom'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
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
    //   padding: theme.spacing(1),
        paddingTop: "6vh",
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
    // padding: theme.spacing(0, 2),
    paddingTop: "10vh",
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
    const [showReportListDetails, setShowReportListDetails] = useState(false)
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(15)
    const [filteredReports, setFilteredReports] = useState(null)

    useEffect(() => {
        getReports(dispatch)
    }, [])

    useEffect(() => {
        center.current = props.currentLocation
        // return resetCenter
    }, [center, resetLocation, props.currentLocation])

    useEffect(() => {
        if (mapRef.current) {
            const { map, maps } = mapRef.current
        }
    }, [mapRef])

    useEffect(()=>{
        return resetLocation()
    },[resetLocation])

    const filterReports = (reports, bounds) => {
        setFilteredReports(reports.filter(report => inBoundingBox(bounds[0], bounds[1], report.lat, report.lng)))
    }

    useEffect(() => {
        bounds && filterReports(props.reports, bounds)
    }, [bounds, props.reports ])

    const handleOnLoad = ({ map, maps }) => { // this is the only way to add controls to google maps api
        mapRef.current = { map, maps }
        let InforObj = []
        const controlButtonDiv = document.createElement('div')
        controlButtonDiv.addEventListener('click', () => { navigate('/reports/new') })
        ReactDOM.render(<MapReportButton />, controlButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(controlButtonDiv)

        const currentLocationButtonDiv = document.createElement('div')
        currentLocationButtonDiv.addEventListener('click', () => { props.setGeolocatedLocation(dispatch) })
        ReactDOM.render(<MapCurrentLocationButton />, currentLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(currentLocationButtonDiv)

        const defaultLocationButtonDiv = document.createElement('div')
        defaultLocationButtonDiv.addEventListener('click', () => { props.resetLocation() })
        ReactDOM.render(<MapDefaultLocationButton />, defaultLocationButtonDiv)
        map.controls[maps.ControlPosition.LEFT_BOTTOM].push(defaultLocationButtonDiv)

        const openListButtonDiv = document.createElement('div')
        openListButtonDiv.addEventListener('click', handleDrawerOpen)
        ReactDOM.render(<MapReportListButton/>, openListButtonDiv)
        map.controls[maps.ControlPosition.TOP_RIGHT].push(openListButtonDiv)

        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const markers = props.reports && props.reports.map((report, i) => {
        
            const lat = report.lat
            const lng = report.lng
            const location = { lat, lng }
            console.log(location)

            return new maps.Marker({position: location, label: labels[i % labels.length], report: report})
        })

        for (const marker of markers) { 
            maps.event.addListener(marker, 'click', function() {
                // console.log("marker!")
                // map.setZoom(18)
                map.setCenter(marker.getPosition())
            })
        }

        for (const marker of markers) {
            const contentString = 
            `<h1> ${marker.report.name}</h1>`+
            `<p> ${marker.report.breed.name} </p>` + 
            `<img width=150 height=auto src=${marker.report.imageUrl}>` + 
            `<a href="http://localhost:3000/reports/${marker.report._id}"> See Full Report</a> `
            const infowindow = new maps.InfoWindow({
                content: contentString,
                maxWidth: 200,
              });
            marker.addListener("click", () => {
                closeOtherInfo()
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                InforObj[0] = infowindow
            })
        }


        function closeOtherInfo() {
            if (InforObj.length > 0) {
                InforObj[0].set("marker", null)
                InforObj[0].close()
                InforObj.length = 0
            }
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
        props.setMarkerLocation(lat, lng)
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
            <Box sx={{ display: 'flex',}}>
                <CssBaseline />
                <Main open={open} sx={{ height: "100vh", zIndex: 1 }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: `${process.env.REACT_APP_B_API_KEY}` }}
                        center={{lat: props.user.user.lat, lng: props.user.user.lng}}
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
                        {!filteredReports && <MapLoadingSpinner text="Loading"/>}
                    </GoogleMapReact>
                </Main>
                {/* <ClickAwayListener onClickAway={handleDrawerClose}> */}
                {/* <ClickAwayListener onClickAway={handleDrawerClose}> */}
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
                    <DrawerHeader>
                    
                    {/* <Tooltip title='Click here to see a list of reports!' placement='left-start' open={showReportButtonTooltip} disableHoverListener disableFocusListener> */}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                        {/* </Tooltip> */}
                        
                    </DrawerHeader>
                    <Divider />
                    <List >
                        {!isEmpty(filteredReports) ? filteredReports.map((report, index) => (
                            <Tooltip key={report._id} title={report.createdAt} placement='left' open={showReportListDetails} disableFocusListener={true}>
                            <ListItem button key={report._id} onMouseEnter={()=>setShowReportListDetails(true)} onMouseLeave={()=>setShowReportListDetails(false)} onClick={()=>setShowReportListDetails(false)}>
                                <ListItemAvatar>
                                    <Avatar alt={report.breed.name} src={`dog-icons/${report.breed.name}.png`} variant="square" sx={{ width: [null, null, 36] }} />
                                </ListItemAvatar>
                                <ListItemText primary={report.breed.name} secondary={report.name} onClick={(e) => handleListItemClick(report.lat, report.lng)}>

                                </ListItemText>
                            </ListItem>
                            </Tooltip>
                        )) : <ListItem>
                                <ListItemText primary="No Reports Found Here. Zoom Out or Pan Around to See More!"></ListItemText>
                            </ListItem>}
                    </List>
                </Drawer>
                {/* </ClickAwayListener> */}
            </Box>
    
  return props.loading === false && props.currentLocation ? !props.geolocating ? renderMap() : <MapLoadingSpinner text={"Locating"}/> : <MapLoadingSpinner text={"Loading"}/>

  
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
    defaultLocation: state.user.defaultLocation,
    currentLocation: state.user.currentLocation,
    geolocating: state.user.geolocating,
    loading: state.reports.loading,
    user: state.user   
})

export default connect(mapStateToProps, { getReports, toggleReportWindow, setGeolocatedLocation, setMarkerLocation, resetLocation })(MapContainer)