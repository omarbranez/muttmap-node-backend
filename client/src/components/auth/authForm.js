import { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authUser, getLatLngOutput } from '../../actions/userActions'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'

const AuthForm = ({authUser, user}) => {
    
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
        Maps.loadModule('Microsoft.Maps.AutoSuggest', function(){
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

    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (registered){
            authUser({ username: values.username, password: values.password}, dispatch, "login")
        } else {
            values.password === values.passwordConfirmation ? authUser({ username: values.username, password: values.password, lat: values.lat, lng: values.lat}, dispatch, "register") : alert("Passwords do not match")
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
        setValues({...values, lat: suggestionResult.location.latitude, lng: suggestionResult.location.longitude})
    }
      
    return (
        <div>
        <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
    >
        <h1 style={{margin: '0 auto'}}>{!registered ? "Create New Account" : "Log In To MuttMap"}</h1>
        <TextField
            id="outlined-name"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
        />
        <br/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
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
                            onMouseEnter={()=>setOpen(true)}
                            onMouseLeave={()=>setOpen(false)}
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
        <br/>
        {!registered && <FormControl>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password-confirmation"
                    // label="Password"
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
                                onMouseEnter={()=>setOpen(true)}
                                onMouseLeave={()=>setOpen(false)}
                                edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
                label="Confirm"
                />
        </FormControl>}
        <br/>
        <br/>
        {!registered && <div id="searchBoxContainer" style={{margin: '0 auto', boxSizing: 'content-box'}} onChange={(e) => e.preventDefault()} >
            <TextField
                onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                id="searchBox"
                label="Location"
            />
        </div>}
        <br/>
        <Button variant="contained" onClick={handleSubmit}>{registered ? "Login" : "Sign Up"}</Button>
            <p style={{ margin: '0 auto', paddingTop: '10px'}}>{!registered ? "Already registered?" : "Need to register?"} <Button variant="contained" onClick={toggleMember}>{!registered ? "Log In" : "Sign Up"}</Button></p>
        </Box>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, { authUser, getLatLngOutput})(AuthForm)