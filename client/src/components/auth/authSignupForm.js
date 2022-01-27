import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { useNavigate } from 'react-router'
import { useNavigate, Link } from 'react-router-dom'
import { createUser, getLatLngOutput } from '../../actions/userActions'

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

const AuthSignupForm = ({createUser}) => {
    // useScript(`https://www.bing.com/api/maps/mapcontrol?key=${process.env.REACT_APP_M_API_KEY}`) // does this do anything
    const [latLngOutput, setLatLngOutput] = useState({lat: null, lng: null})
    const [username, setUsername] = useState('')
    const [values, setValues] = useState({
        password: '',
        passwordConfirmation: '',
        showPassword: false
    })
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    // const useScript = url => {
        useEffect(()=>{
            const script = document.createElement("script")
            script.src = process.env.REACT_APP_B_SITE_KEY
            script.type = "text/javascript"
            script.async = true
            document.body.appendChild(script)
            console.log(script.src)
            window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {callback: onLoad})
            // const onLoad = () => {
             const options = { maxResults: 5 };
                 const manager = new window.Microsoft.Maps.AutosuggestManager(options)
                 manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion)
            // }
            return () => {
                document.body.removeChild(script)
            }
        }, [])
    // }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        values.password === values.passwordConfirmation ? createUser({ username: username, password: values.password, lat: latLngOutput.lat, lng: latLngOutput.lng}, navigate) : alert("Passwords do not match")
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
    
    // window.Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', { // how to make sure it doesnt error out before it actually
    //  callback: onLoad,
    //  errorCallback: onError
    // })
    const onLoad = () => { // 
        console.log(!!Maps)
        // if (Maps){
            const options = { maxResults: 5 };
            const manager = new window.Microsoft.Maps.AutosuggestManager(options);
            manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
        // }
        // else {
        //  console.log("lol")
        // }
    }
    
    const onError = (message) => {
     document.getElementById('printoutPanel').innerHTML = message;
    }
    
    function selectedSuggestion(suggestionResult) {
        setLatLngOutput({lat: suggestionResult.location.latitude, lng: suggestionResult.location.longitude})
    }
      
    return (
        <div>
        {/* {values.password == '' ?  */}
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={(e) => setValues({password: e.target.value})}
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
            <br/>
            <OutlinedInput
                    id="outlined-adornment-password"
                    // label="Password"
                    type={values.showPassword ? 'text' : 'passwordConfirmation'}
                    value={values.passwordConfirmation}
                    onChange={(e) => setValues({passwordConfirmation: e.target.value})}
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
                label="Confirm Password"
                />
    </FormControl>
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Link to={'/login'}>
            <p>Already registered? <Button variant="contained">Log In</Button></p>
        </Link>
    </Box>
            {/* <form onSubmit={handleSubmit}>
             <label>Username:</label><br/>
             <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/><br/>
             <label>Password</label><br/>
             <input type="password" name="password" value={values.password} onChange={(e) => setPassword(e.target.value)} required/><br/>
                
             <label>Set Location</label><br/>
             <div id='searchBoxContainer'><input type='text' id= 'searchBox'/></div>
             <input type="submit" value="Sign Up" />
            </form> */}
        {/* : <h2>Loading</h2>} */}
        </div>
    )
}

export default connect(null, { createUser, getLatLngOutput})(AuthSignupForm)