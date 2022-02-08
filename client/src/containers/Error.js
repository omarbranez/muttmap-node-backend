import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div>
            <h3>Page not found</h3>
            <p>We can't find the page you're looking for</p>
            <Link to='/'>Back to Home Page</Link>
        </div>
    )
}

export default Error