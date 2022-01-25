import { Navigate } from 'react-router-dom'
import isUserLoggedIn from '../util/auth'

const handleRedirect = () => {
    alert("You Must Be Logged In to View That Page")
    return <Navigate to='/login'/>
}
const PrivateRoute = ({children}) => {
    return isUserLoggedIn() ? children : handleRedirect()
}
export default PrivateRoute