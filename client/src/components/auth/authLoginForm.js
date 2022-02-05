import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { authUser } from '../../actions/userActions'
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

const AuthLoginForm = ({authUser}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    })

    const [open, setOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        values.username !== '' && values.password !== '' ? authUser({username: values.username, password: values.password}, dispatch, "login") : alert("All fields must be filled")
        // setValues({password: '', showPassword: false})
    }

    const handleClickShowPassword = (e) => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }
    return (
        <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <h1 style={{margin: '0 auto'}}>Log In To MuttMap</h1>
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
            <Button variant="contained" onClick={handleSubmit}>Log In</Button>
            <Link to={'/signup'}>
                <p>Need to Register? <Button variant="contained">Sign Up</Button></p>
            </Link>
        </Box>
    )
}

export default connect(null, { authUser })(AuthLoginForm)