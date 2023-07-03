import React from 'react'
import { Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
            <BrowserRouter>
                <Container maxWidth="lg" style={{display: 'flex', flexDirection: 'column'}}>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/auth' element={<Auth />}/>
                        <Route path='/posts/:id' element={<PostDetails />} />
                    </Routes>

                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
        
    )
}

export default App