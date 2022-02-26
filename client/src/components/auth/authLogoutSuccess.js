import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { logoutUser } from '../../actions/userActions'

const AuthLogoutSuccess = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            props.logoutUser(dispatch)
        }, 1500) 
        return () => clearTimeout(timer)
    })

    return(
        <h2>You have been logged out. Redirecting you to the home page!</h2>
    )
}

export default connect(null, {logoutUser})(AuthLogoutSuccess)