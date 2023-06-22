import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@mui/material'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} style={{flexDirection: 'row'}} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                {/* <Typography className={classes.heading} variant='h2' align='center' component={Link} to={'/'}>
                    Blog
                </Typography> */}
                <img  className={classes.img} src={logo} alt='logo' height="60" style={{marginLeft: '5px', cursor: 'pointer'}} onClick={() => navigate('/')}/>
            </div>

            <Toolbar className={classes.toolbar}>
                {user ?
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user.result.name}
                        </Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
                            Logout
                        </Button>
                    </div>
                    :
                    <Button variant='contained' color='primary' component={Link} to='/auth'>
                        Login
                    </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar