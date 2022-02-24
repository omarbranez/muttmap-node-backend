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
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'

const AuthForm = ({ authUser, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(!!user)
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
        passwordConfirmation: '',
        lat: null,
        lng: null,
        showPassword: false
    })
    const [registered, setRegistered] = useState(true)

    const makeAutosuggestBox = useCallback(() => {
        const { Maps } = window.Microsoft
        Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
            const options = { maxResults: 5 }
            const manager = new Maps.AutosuggestManager(options)
            manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion)
        })
    }, [])

    useEffect(() => {
        if (window.Microsoft && window.Microsoft.Maps) {
            makeAutosuggestBox()
        } else {
            const scriptTag = document.createElement("script")
            scriptTag.setAttribute("type", "text/javascript")
            scriptTag.setAttribute(
                "src",
                `https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_M_API_KEY}&callback=makeMap`
            )
            scriptTag.async = true
            scriptTag.defer = true
            document.body.appendChild(scriptTag)
            window.makeAutosuggestBox = makeAutosuggestBox
        }
    }, [makeAutosuggestBox])

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

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    const toggleMember = () => {
        setRegistered(!registered)
    }
    function selectedSuggestion(suggestionResult) {
        setValues({ ...values, lat: suggestionResult.location.latitude, lng: suggestionResult.location.longitude })
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
                    {!registered && <div id="searchBoxContainer" style={{ margin: "0.5vh", boxSizing: 'content-box' }} onChange={(e) => e.preventDefault()} >
                            <TextField
                                style={{width: "25ch", }}
                                onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                id="searchBox"
                                label="Location"
                            />
                        </div>}
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
                                        <Tooltip title={values.showPassword ? 'Hide Password' : 'Show Password'} placement='top-start' open={open} disableHoverListener disableFocusListener>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseEnter={() => setOpen(true)}
                                                onMouseLeave={() => setOpen(false)}
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
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Tooltip title={values.showPassword ? 'Hide Password' : 'Show Password'} placement='top-start' open={open} disableHoverListener disableFocusListener>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseEnter={() => setOpen(true)}
                                                onMouseLeave={() => setOpen(false)}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
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