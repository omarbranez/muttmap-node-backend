import React from 'react'
import background from '../dog-walking.gif'
import { Link } from 'react-router-dom'

const HomeContainer = () => {

return (
    <div style={{backgroundImage: `url(${background})`, height: '91vh', backgroundSize: 'cover'}}>
        <br/>
        <h1 style={{color: 'white', textShadow: '1px 1px 2px black'}}>Welcome to</h1>
        <img src='./muttmap-logo.png'></img>
        <br/>
        <h3 style={{color: 'white', textShadow: '1px 1px 2px black'}}>Create an account to know when GOODBOIS and GOODGIRLS are in your neighborhood!</h3>
        <Link to={'/login'}>
            <button className='welcomeButton' text="Log In" style={{color: 'white', minWidth: 200, minHeight: 50, background:
                'linear-gradient(to right, #03018C, #212AA5, #4259C3, #7B9FF2'}}>Log In</button>
        </Link>
        <br/><br/>
        <Link to={'/signup'}>
            <button className='welcomeButton' text="Sign Up" style={{color: 'white', minWidth: 200, minHeight: 50, background:
                'linear-gradient(to right, #03018C, #212AA5, #4259C3, #7B9FF2'}}>Sign Up</button>
        </Link>
    </div>


)
}


export default HomeContainer