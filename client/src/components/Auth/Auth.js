import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material'
import useStyles from './styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './input'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(signup(formData, navigate));
          } else {
            dispatch(signin(formData, navigate));
          }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const switchMode = () => {
        // setForm(initialState);
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = jwt_decode(res.credential)
        const token = res.credential

        try {
            dispatch({ type: 'AUTH', data: { token, result } })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log('Sign In Failed') 
        console.log(error)  
    }

    return (
        <Container component={'main'} maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid id='Grid' container spacing={0}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && 
                            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> 
                        }
                    </Grid>
                    
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />

                    <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '10px'}}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>

                    <Grid item style={{marginLeft: 'auto', width: 'fit-content'}}>
                        <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth