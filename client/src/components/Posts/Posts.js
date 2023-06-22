import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles'
import { Grid, CircularProgress } from '@mui/material'

const Posts = ({ setCurrentID }) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.posts)

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid id='debug' className={classes.container} container alignItems={'stretch'} spacing={3} style={{width: '100%'}}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6} style={{width: '100%'}}>
                        <Post post={post} setCurrentID={setCurrentID} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts