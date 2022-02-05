import { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router'
import { useNavigate, Link } from 'react-router-dom'
import { authUser, getLatLngOutput } from '../../actions/userActions'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'

const AuthSignupForm = ({authUser}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        var options = { maxResults: 5 };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
    }, [])

    const [values, setValues] = useState({
        username: '',
        password: '',
        passwordConfirmation: '',
        lat: null,
        lng: null,
        showPassword: false
    })

    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        values.password === values.passwordConfirmation ? authUser({ username: values.username, password: values.password, lat: values.lat, lng: values.lat}, dispatch, "register") : alert("Passwords do not match")
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
    
    function selectedSuggestion(suggestionResult) {
        setValues({...values, lat: suggestionResult.location.latitude, lng: suggestionResult.location.longitude})
    }
      
    return (
        <div>
        {/* { scriptLoaded ?  */}
        <Box
        component="form"
        sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
    >
        <h1 style={{margin: '0 auto'}}>New MuttMap Account</h1>
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
        <FormControl>
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
        </FormControl>
        <br/>
        <br/>
        <div id="searchBoxContainer" style={{margin: '0 auto', boxSizing: 'content-box'}} onChange={(e) => e.preventDefault()} >
            <TextField
                onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                id="searchBox"
                label="Location"
            />
            {/* // <div id='searchBoxContainer'><input type='text' id= 'searchBox'/></div> */}
        </div>
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Link to={'/login'}>
            <p>Already registered? <Button variant="contained">Log In</Button></p>
        </Link>
    </Box>
        {/* : <h2>Loading</h2>} */}
        </div>
    )
}

export default connect(null, { authUser, getLatLngOutput})(AuthSignupForm)