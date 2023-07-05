import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import Form from '../../Form/Form';
import { useModalProvider } from '../../../ModalProvider';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentID }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { createModal } = useModalProvider()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))

    function renderEditPostModal(id) {
        createModal(
            <Form
                style={{ width: '50%' }}
                escClose={true}
                clickOutsideClose={true}
                currentID={id}
                setCurrentID={setCurrentID}
            />
        )
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                )
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }



    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) ? 
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => { setCurrentID(post._id); renderEditPostModal(post._id) }}>
                        <MoreHorizIcon fontSize='large' />
                    </Button>
                </div> 
                :
                null
            }

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>
                    {post.tags.map(tag => {
                        return (
                            `#${tag} `
                        )
                    })}
                </Typography>
            </div>

            <Typography className={classes.title} variant='h5' gutterBottom style={{cursor: 'pointer', textDecoration: 'underline', color: '#0000EE'}} onClick={openPost}>{post.title}</Typography>
                    
            <CardContent>
                <Typography variant='body2' color='textSecondary' component={'p'} gutterBottom>
                    {post.message.split(' ').length > 20 ? `${post.message.split(' ').splice(0, 20).join(' ')} ...` : post.message}
                </Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => { dispatch(likePost(post._id)) }} disabled={!user?.result}>
                    <Likes />
                </Button>

                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) ?
                    <Button size='small' color='primary' onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                    :
                    null
                }
                
            </CardActions>
        </Card>
    )
}

export default Post