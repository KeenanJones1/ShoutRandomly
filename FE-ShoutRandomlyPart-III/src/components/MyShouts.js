import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import IconButton from '@material-ui/core/IconButton'
import {
    Delete,
    Edit,
    RemoveCircle
} from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
    container: {
        position: 'relative',
        height: '100vh',
        width: '100vw',
        top: 100,
        backgroundColor: theme.palette.secondary.light
    },
    card: {
        marginTop: 20,
        marginBottom: 20,
        position: 'relative',
        top: 50,
        width: 400
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    media: {
        position: 'relative',
        right: '7vw',
        height: '30vh',
        objectFit: 'contain'
    },
    usercontent: {
        position: 'relative',
        left: '7vw',
        bottom: '2vh'
    },
    imgContainer: {
        height: '5vh',
        width: '20vw',
        position: 'relative',
        left: '2vw',
        bottom: '4vh'
    },
    background: {
        backgroundColor: theme.palette.secondary.light,
        height: '140vh',
        width: '100vw'
    }
})


// When updating the shouts or comments after the delete function update the app state.
// Fix issue while rerendering to get props from app must go home then to myShouts


class MyShouts extends React.Component {

        constructor() {
            super()
            this.state = {
                shouts: [],
                comments: [],
                rendered: false,
                comment: {
                    commentBody: "",
                    commentId: null
                },
                open: false,
                setOpen: false,
                shout: {
                    shoutBody: "",
                    shoutId: null
                },
                dialogType: "",
                followed_users: []
            }
        }



        deleteShout = (id) => {
            const token = localStorage.getItem('token')
            const deleteObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            fetch(`http://localhost:3000/shouts/${id}`, deleteObj)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        shouts: data.shouts,
                        comments: data.comments
                    })
                })

        }

        editShout = (id) => {
            this.setState(prevState => ({
                setOpen: !prevState.setOpen,
                open: !prevState.open,
                dialogType: 'shout',
                shout: {
                    shoutId: id
                }
            }))
        }

        handleSubmit = () => {
            const token = localStorage.getItem('token')
            const {
                shoutId
            } = this.state.shout
            const {
                commentId
            } = this.state.comment
            console.log(commentId)
            const shoutObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(this.state.shout)
            }

            const commentObj = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(this.state.comment)
            }

            // http://localhost:3000/shouts/${id}
            {
                this.state.dialogType === 'shout' ?
                    fetch(`http://localhost:3000/shouts/${shoutId}`, shoutObj)
                    .then(resp => resp.json())
                    .then(data => this.setState({
                        shouts: data
                    })) :

                    fetch(`http://localhost:3000/comments/${commentId}`, commentObj)
                    .then(resp => resp.json())
                    .then(data => {
                        this.setState({
                            comments: data
                        })
                    })
            }
                this.handleClose()
        }


        handleClose = () => {
            this.setState({
                setOpen: false,
                open: false
            })
        }

        editComment = (id) => {
            this.setState(prevState => ({
                setOpen: !prevState.setOpen,
                open: !prevState.open,
                dialogType: 'comment',
                comment: {
                    commentId: id
                }
            }))
        }

        deleteComment = (id) => {
            const token = localStorage.getItem('token')
            const deleteObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            fetch(`http://localhost:3000/comments/${id}`, deleteObj)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        comments: data
                    })
                })

        }

        unfollow = (id) => {
            const token = localStorage.getItem('token')
            const unFollowObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    followedUserId: id
                })
            }


            fetch('http://localhost:3000/unfollow', unFollowObj)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        shouts: data.shouts,
                        comments: data.comments,
                        followed_users: data.followed_users,
                        rendered: true
                    })
                })

        }

        handleForm = (e) => {
            {
                this.state.dialogType === 'shout' ?
                    this.setState({
                        ...this.state,
                        shout: {
                            ...this.state.shout,
                            shoutBody: e.target.value
                        }
                    }) : this.setState({
                        ...this.state,
                        comment: {
                            ...this.state.comment,
                            commentBody: e.target.value
                        }
                    })
            }
        }



        componentDidMount() {

            const token = localStorage.getItem('token')
            const reqObj = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            fetch('http://localhost:3000/myuser', reqObj)
                .then(resp => resp.json())
                .then(data => {

                    this.setState({
                        shouts: data.shouts,
                        comments: data.comments,
                        followed_users: data.followed_users,
                        rendered: true
                    })
                })
        }





        renderShouts = () => {
            const {
                classes
            } = this.props
            const {
                shouts
            } = this.state
            dayjs.extend(relativeTime)


            if (this.state.shouts.length > 0) {
                return shouts.map(shout =>
                    <Card className = { classes.card} >
                    <CardContent className = { classes.content } >
                    <Typography variant = "h5" > 
                        { shout.body } 
                    </Typography> 

                    <Typography variant = "body2" color="textSecondary"> 
                        { shout.likeCount } likes 
                    </Typography>

                    <Typography variant = "body2" color = "textSecondary"> 
                        { shout.commentCount } comments 
                    </Typography>

                    <Typography variant = "body2" color = "textSecondary">
                        Created { dayjs(shout.created_at).fromNow()} 
                    </Typography>

                    <Typography variant = "body2" color = "textSecondary">
                        Last Updated { dayjs(shout.updated_at).fromNow()} 
                    </Typography>

                    <IconButton aria-label = "like" className = { classes.button}>
                        <Delete onClick = { () => this.deleteShout(shout.id)}/> 
                    </IconButton>

                    <IconButton aria-label = "like" className = { classes.button } >
                        <Edit onClick = { () => this.editShout(shout.id) } /> 
                    </IconButton> 
                    </CardContent> 
                    </Card>
                )
            } else {
                return ( 
                <Card className = { classes.card } >
                    <Typography variant = "h6" color = "textSecondary" >
                        Create your first Shout 
                    </Typography> 
                </Card>
                )
            }
        }

        renderComments = () => {
            const { classes } = this.props
            dayjs.extend(relativeTime)
            if (this.state.comments.length > 0) {
                return this.state.comments.map(comment =>
                    <Card className = { classes.card } >
                    <CardContent className = { classes.content} >


                    <Typography variant = "h5" > { comment.body} 
                    </Typography> 

                    <Typography variant = "body2"
                    color = "textSecondary" >
                    Created { dayjs(comment.created_at).fromNow() } 
                    </Typography>

                    <Typography variant = "body2" color = "textSecondary" >
                    Last Updated { dayjs(comment.updated_at).fromNow() } 
                    </Typography>

                    <IconButton aria-label = "like" className = { classes.button } >
                    <Delete onClick = { () => this.deleteComment(comment.id) }/> 
                    </IconButton>

                    <IconButton aria-label = "like"
                    className = { classes.button } >
                    <Edit onClick = { () => this.editComment(comment.id)}/> 
                    </IconButton>
                    </CardContent> 
                    </Card>
                )
            } else {
                return ( < Card className = { classes.card } >
                    <Typography variant = "h6"
                    color = "textSecondary"
                    className = {
                        classes.username
                    } >
                    Create your first comment 
                    </Typography> 
                    </Card>
                )
            }
        }

        renderFollowed = () => {
            const { classes } = this.props
            dayjs.extend(relativeTime)
            if (this.state.followed_users.length > 0) { return this.state.followed_users.map( user =>
                    <Card className = { classes.card } >
                    <div className = { classes.imgContainer } >
                    < CardMedia className = { classes.media } component = "img" height = '100' src = { user.imgUrl} title = "User's profile images" />
                    </div> 
                    <CardContent className = { classes.usercontent} >
                    <Typography variant = "h6" color = "textSecondary" className = { classes.username } > 
                        { user.username } 
                    </Typography>
                    <Typography variant = "body2" color = "textSecondary" className = { classes.userbio } > 
                        { user.bio } 
                    </Typography>
                    <IconButton aria-label = "like" className = { classes.unfollowbutton } onClick = { () => this.unfollow(user.id)}>
                        <RemoveCircle / >
                    </IconButton>
                </CardContent>
                </Card>
                )
            } else {
                return ( 
                    <Card className = { classes.card }>
                        <Typography variant = "h6" color = "textSecondary" className = {classes.username }>
                            Follow your first user 
                        </Typography> 
                    </Card>
                )
            }
        }


render() {
const { classes } = this.props
return ( 
<Grid container className = { classes.background } >
    <Grid item container direction = "row-reverse" spacing = { 4 } className = { classes.container }>
        <Grid item xs = { 6 } sm = { 4 } >
            <Typography variant = "h4" color = "textSecondary" className = { classes.shoutTitle } >
                Shouts 
            </Typography> {this.state.rendered === true ? this.renderShouts() : <p> Loading... </p>} 
        </Grid>
        <Grid item xs = { 6 } sm = { 4 } >
            <Typography variant = "h4" color = "textSecondary" className = { classes.commentTitle } >
                Comments 
            </Typography> 
            {this.state.rendered === true ? this.renderComments() : <p> Loading... </p> } 
        </Grid>
        <Grid item xs = { 6 } sm = { 4 }>
            <Typography variant = "h4" color = "textSecondary" className = { classes.followedTitle }>
                Following 
            </Typography> {this.state.rendered === true ? this.renderFollowed() : <p> Loading... </p>} 
        </Grid>
    </Grid>
    <Dialog open = { this.state.open } onClose = { this.handleClose } aria-labelledby = "form-dialog-title" >
        <DialogTitle id = "form-dialog-title" > { this.state.dialogType === 'shout' ? 'Edit Shout' : 'Edit Comment'}
        </DialogTitle> 
        <DialogContent>
            <DialogContentText> 
                {this.state.dialogType === 'shout' ? 'Edit your shout here, make sure to save.' : 'Edit your comment here make sure you save'} 
            </DialogContentText> 
            <TextField onChange = { this.handleForm } autoFocus margin = "dense" id = "name" label = { this.state.dialogType === 'shout' ? "Shout Body" : 'Comment Body' } fullWidth/>
        </DialogContent> 
        <DialogActions >
            <Button onClick = { this.handleClose } color = "primary" >
                Cancel 
            </Button> 
            <Button onClick = { this.handleSubmit } color = "primary" >
                Save 
            </Button> 
        </DialogActions> 
    </Dialog>
</Grid>
        )
    }
}

    export default withStyles(styles)(MyShouts);