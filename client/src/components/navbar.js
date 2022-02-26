import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
// import Tooltip from '@mui/material/Tooltip'
// import CssBaseline from '@mui/material/CssBaseline'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MuiAppBar from '@mui/material/AppBar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LoginIcon from '@mui/icons-material/Login'
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone'
import AnnouncementSharpIcon from '@mui/icons-material/AnnouncementSharp'
import PetsSharpIcon from '@mui/icons-material/PetsSharp'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined'

import muttmapText from '../muttmap-text.png'
import muttmapIconOpen from '../muttmap-menu-icon-open.png'
import muttmapIconClosed from '../muttmap-menu-icon.png'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

const Navbar = (props) => {
    const user = props.user
    const linkRoutesAndIcons = [
        {
            path: "/map",
            text: "Map",
            icon: <MapTwoToneIcon />
        },
        {
            path: "/reports",
            text: "News Feed",
            icon: <AnnouncementSharpIcon />
        },
        {
            path: "breeds",
            text: "Breed Information",
            icon: <PetsSharpIcon />
        },
        {
            path: "reports/new",
            text: "Create New Report",
            icon: <AddBoxOutlinedIcon />
        }
    ]

    const loggedInRoutesAndIcons = [
        {
            path: `/profile/${user.username}`,
            text: "My Profile",
            icon: <AccountBoxOutlinedIcon />
        },
        {
            path: "/logout",
            text: "Log Out",
            icon: <ExitToAppOutlinedIcon />
        },
    ]

    const loggedOutRoutesAndIcons = [
        {
            path: '/login',
            text: "Log In",
            icon: <LoginIcon />
        },
        {
            path: '/signup',
            text: "Create New Account",
            icon: <FiberNewOutlinedIcon />
        }
    ]

    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    return (
        <div>
            <Box sx={{ display: 'flex', }}>
                {/* <CssBaseline /> */}
                <ClickAwayListener onClickAway={handleClickAway}>
                    <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: 'linear-gradient(to left, #03018C, #212AA5, #4259C3, #7B9FF2' }}>
                        <Toolbar >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <img src={muttmapIconClosed} width="40" alt="muttmapIconClosed" ></img>
                            </IconButton>
                            <img src={muttmapText} height="45" style={{ display: 'block', marginLeft: 'auto', marginRight: '500' }} alt="muttmap logo"></img>
                        </Toolbar>
                    </AppBar>
                </ClickAwayListener>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="temporary"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <img src={muttmapIconOpen} width="50" alt="open drawer icon" ></img>
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {user.username ?
                        <List>
                            {linkRoutesAndIcons.map((route) => (
                                <Link to={route.path} key={route.path}>
                                    <ListItem button key={route.text} onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.text} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                        :
                        <List>
                            {loggedOutRoutesAndIcons.map((route) => (
                                <Link to={route.path} key={route.path}>
                                    <ListItem button key={route.text} onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.text} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    }

                    <Divider />
                    {user.username &&
                        <List>
                            {loggedInRoutesAndIcons.map((route) => (
                                <Link to={route.path}>
                                    <ListItem button key={route.text} onClick={handleDrawerClose}>
                                        <ListItemIcon>
                                            {route.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={route.text} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    }
                </Drawer>
            </Box>
        </div>
    )
}



const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Navbar)