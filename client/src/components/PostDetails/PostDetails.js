import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'

import { getPost } from '../../actions/posts'
import useStyles from './styles'

const PostDetails = () => {
	const { post, isLoading } = useSelector((state) => state.posts)
	const dispatch = useDispatch()
	const classes = useStyles()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	if (!post) return null

	if (isLoading) {
		return (
		<Paper elevation={6} className={classes.loadingPaper}>
			<CircularProgress size="7em" />
		</Paper>
		)
	}

	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
		<div className={classes.card}>
			<div className={classes.section}>
				<Typography variant="h3" component="h2" style={{textAlign: 'center'}}>{post.title}</Typography>

				<Divider style={{ margin: '20px 0' }} />
				
				<Typography gutterBottom variant="body1" component="p">{post.message}</Typography>

				<Divider style={{ margin: '20px 0' }} />

				<Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>

				<div style={{display: 'flex', alignItems: 'center'}}>
					<Typography variant="h6">Created by: {post.name}</Typography>
					<Typography variant="body1" style={{marginLeft: '10px', height: 'min-content', marginTop: '2px'}}>{moment(post.createdAt).fromNow()}</Typography>
				</div>
			</div>
			<div className={classes.imageSection}>
			<img className={classes.media} src={post.selectedFile} alt={post.title} />
			</div>
		</div>
		</Paper>
	)
}

export default PostDetails