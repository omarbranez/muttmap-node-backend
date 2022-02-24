import React from 'react'
import background from '../dog-walking.gif'
import { Link } from 'react-router-dom'

const HomeContainer = () => {

    return (
        <div style={{ display: "flex", flexDirection: "column", }}>
            <div style={{ backgroundImage: `url(${background})`, height: "100vh", backgroundSize: 'cover' }}>
                <div style={{ flex: "1", marginTop: "10vh" }}>
                    <span style={{ color: 'white', textShadow: '1px 1px 2px black', fontSize: "4em", }}>Welcome to</span>
                </div>
                <div style={{ flex: "0" }}>
                    <img style={{ marginLeft: "auto", marginRight: "auto" }} src='./muttmap-logo.png'></img>
                </div>
                <div style={{ marginBottom: "5vh" }}>
                    <span style={{ color: 'white', fontSize: "1em", textShadow: '1px 1px 2px black' }}>Create an account to know when GOODBOIS and GOODGIRLS are in your neighborhood!</span>
                </div>
                <Link to={'/login'}>
                    <button className='welcomeButton' text="Log In" style={{
                        color: 'white', minWidth: 200, minHeight: 50, background:
                            'linear-gradient(to right, #03018C, #212AA5, #4259C3, #7B9FF2'
                    }}>Log In</button>
                </Link>
            </div>

        </div>

    )
}


export default HomeContainer