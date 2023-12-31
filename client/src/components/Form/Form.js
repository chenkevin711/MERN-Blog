import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'
import { useModalProvider } from '../../ModalProvider'

const Form = ({ currentID, setCurrentID }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { closeAll } = useModalProvider()
    const post = useSelector((state) => currentID ? state.posts.find(p => p._id === currentID) : null)
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''})
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentID) {
            dispatch(updatePost(currentID, { ...postData, name: user?.result?.name }))
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        }
        closeAll()
        clear()
    }

    const clear = () => {
        setCurrentID(null)
        setPostData({ title: '', message: '', tags: '', selectedFile: ''})
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>
                    {`${currentID ? 'Editing' : 'Creating'} a Post`}
                </Typography>
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} 
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='Post' 
                    fullWidth
                    multiline
                    minRows={5}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label='Tags (comma separated)' 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={(file) => {console.log(file); setPostData({ ...postData, selectedFile: file.base64 })}}
                    />
                </div>

                <Button style={{marginBottom: '10px'}} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                
                <Button variant='contained' color='secondary' size='small' fullWidth onClick={clear}>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form