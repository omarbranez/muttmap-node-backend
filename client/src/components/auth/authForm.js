import { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authUser, getLatLngOutput } from '../../actions/userActions'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'

const AuthForm = ({ authUser, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openPasswordTooltip, setOpenPasswordTooltip] = useState(false)
    const [openPasswordConfirmTooltip, setOpenPasswordConfirmTooltip] = useState(false)
    const [openLocateTooltip, setOpenLocateTooltip] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
        passwordConfirmation: '',
        lat: null,
        lng: null,
        locationZip: '',
        locationCity: '',
        showPassword: false,
        showPasswordConfirm: false,
    })
    // const [cityResult, setCityResult] = useState('')
    const [registered, setRegistered] = useState(true)

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (registered) {
            authUser({ username: values.username, password: values.password }, dispatch, "login")
        } else {
            values.password === values.passwordConfirmation ? authUser({ username: values.username, password: values.password, lat: values.lat, lng: values.lat }, dispatch, "register") : alert("Passwords do not match")
        }
    }

    const handleClickShowPassword = (e) => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const handleClickShowPasswordConfirmation = (e) => {
        setValues({
            ...values,
            showPasswordConfirm: !values.showPasswordConfirm
        })
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    const toggleMember = () => {
        resetForm()
        setRegistered(!registered)
    }


    // const setLocationFromZip = (res) => {
    //     setCityResult(res.features[0].properties.address.locality)
    //     setValues({...values, lat: res.features[0].properties.geocodePoints[0].geometry.coordinates[1], lng:res.features[0].properties.geocodePoints[0].geometry.coordinates[0]})
    // }

    const resetForm = () => {
        setValues({
            username: '',
            password: '',
            passwordConfirmation: '',
            lat: null,
            lng: null,
            locationCity: '',
            locationZip: '',
            showPassword: false,
        })
    }

    const setLocationFromGeolocate = (city, zip) => {

    }
    const handleLocation = async() => {
        await fetch(`https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&subscription-key=${process.env.REACT_APP_AZURE_SUB_KEY}&query=${parseInt(values.locationZip)}`)
        .then(res => res.json())
        .then(res => setValues({...values, lat: res.features[0].properties.geocodePoints[0].geometry.coordinates[1], lng:res.features[0].properties.geocodePoints[0].geometry.coordinates[0], locationCity: res.features[0].properties.address.locality}))
    }

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    }
    
    const handleUseCurrentLocation = async() => {
        try {
            let {coords} = await getPosition()            
            const res = await fetch(`https://atlas.microsoft.com/search/address/reverse/json?subscription-key=${process.env.REACT_APP_AZURE_SUB_KEY}&api-version=1.0&query=${coords.latitude},${coords.longitude}`)
            .then(res => res.json())
            .then(res => setValues({...values, locationCity: res.addresses[0].address.localName, locationZip: res.addresses[0].address.postalCode, lat: coords.latitude, lng: coords.longitude}))
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", }}>
            <Grid direction="column" justifyContent="center">
                <Box pt="15vh" justifyContent="center" align="center">
                    <Grid item container direction="column" justifyContent="center" alignItems="center" >
                        <Typography align="center" style={{ fontSize: "5vh", fontWeight: "bold" }}>{!registered ? "Create New Account" : "Log In To MuttMap"}</Typography>
                    </Grid>
                </Box>
                <form style={{ boxSizing: 'content-box'}} onSubmit={handleSubmit}>
                    <Grid container alignItems="center" style={{ display: "flex", flexDirection: "column", marginTop: "2vh",  }}>
                        {!registered && <FormControl margin="dense" style={{width: "25ch", }}>
                            <InputLabel>Location</InputLabel>
                            <OutlinedInput
                                disabled={!!values.locationCity}
                                id="outlined-location"
                                label="Location"
                                name="locationZip"
                                value={values.locationZip}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Tooltip title="Use Current Location" placement="bottom-start" open={openLocateTooltip} disableHoverListener disableFocusListener>
                                        <IconButton
                                            aria-label="use current location"
                                            onClick={handleUseCurrentLocation}
                                            onMouseEnter={() => setOpenLocateTooltip(true)}
                                            onMouseLeave={() => setOpenLocateTooltip(false)}
                                            edge="end"
                                        >
                                            <MyLocationIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                                }
                                
                            />
                            <Button onClick={handleLocation}>Use Location</Button>
                            {values.locationCity && <span>Ah, {values.locationCity}</span>}
                        </FormControl>}
                        <FormControl margin="dense" style={{width: "25ch"}} >
                            <InputLabel>Username</InputLabel>
                            <OutlinedInput
                                id="outlined-name"
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl margin="dense" style={{width: "25ch"}}>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                name="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Tooltip title={values.showPassword ? 'Hide Password' : 'Show Password'} placement='top-start' open={openPasswordTooltip} disableHoverListener disableFocusListener>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseEnter={() => setOpenPasswordTooltip(true)}
                                                onMouseLeave={() => setOpenPasswordTooltip(false)}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {!registered && <FormControl margin="dense" style={{width: "25ch"}}>
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-confirmation"
                                name="passwordConfirmation"
                                type={values.showPasswordConfirm ? 'text' : 'password'}
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Tooltip title={values.showPasswordConfirm ? 'Hide Password' : 'Show Password'} placement='top-start' open={openPasswordConfirmTooltip} disableHoverListener disableFocusListener>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirmation}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseEnter={() => setOpenPasswordConfirmTooltip(true)}
                                                onMouseLeave={() => setOpenPasswordConfirmTooltip(false)}
                                                edge="end"
                                            >
                                                {values.showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>}
                        <Button style={{marginTop: "1vh"}} variant="contained" onClick={handleSubmit}>{registered ? "Login" : "Sign Up"}</Button>
                            <p style={{  paddingTop: '10px' }}>{!registered ? "Already registered?" : "Need to register?"} <Button variant="contained" onClick={toggleMember}>{!registered ? "Log In" : "Sign Up"}</Button></p>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, { authUser, getLatLngOutput })(AuthForm)