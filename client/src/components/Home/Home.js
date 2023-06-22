import React, { useState, useEffect } from 'react'
import { Grow, Container, Grid, Button, Paper, Typography } from '@mui/material'
import Posts from '../Posts/Posts'
import useStyles from '../../styles'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { useModalProvider } from '../../ModalProvider'
import Form from '../Form/Form'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentID, setCurrentID] = useState(null)
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, currentID])

    const { createModal, close } = useModalProvider()

    function renderCreatePostModal() {
        createModal(
            <Form
                style={{width: '50%'}}
                escClose={true}
                clickOutsideClose={true}
                currentID={currentID} 
                setCurrentID={setCurrentID}
            />
        )
    }

    return (
        <>
            {!user?.result?.name ?
                <Paper style={{border: '2px solid black', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer'}} onClick={() => navigate('/auth')}>
                    <Typography variant='h6' align='center'>
                        Please Login to Create Or Like a Post
                    </Typography>
                </Paper>
                :
                <Button onClick={() => renderCreatePostModal()} style={{marginBottom: '10px', marginLeft: 'auto'}} variant='contained' color='primary' size='large'>
                    Create
                </Button>
            }
            
            
            <Grow in style={{border: '5px solid black', borderRadius: '5px', padding: '10px', display: 'flex', width: '100%'}}>
                <Container style={{width: '100%', justifyContent: 'center'}} maxWidth={false} disableGutters>
                    <Grid id='MainContainer' container className={classes.mainContainer} alignItems={"stretch"} spacing={3} style={{width: '100%', margin: 'auto'}}>
                        <Grid item xs={12} style={{width: '100%'}}>
                            <Posts setCurrentID={setCurrentID}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    )
}

export default Home