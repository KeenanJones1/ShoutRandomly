import React, {Component, Fragment} from 'react'
import CommentButton from './CommentButton'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Comment, Close } from '@material-ui/icons';


const styles = theme => ({
    submitButton: {
        position: 'relative'
    }, 
    button: {color: 'white'},
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '10%'
    }
})

class PostComment extends Component{
    constructor(){
        super()
        this.state = {
            open: false,
            body: '',
             error: ""
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose= () => {
        this.setState({open: false})
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (this.state.body !== ""){
            const {body} = this.state
            event.preventDefault()
            const token = localStorage.getItem('token')
        const postObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({body: body, shoutId: this.props.shoutId})
        }
        fetch(`http://localhost:3000/comments`, postObj)
        .then(resp => resp.json())
        .then(data => 
            console.log(data)
             
        )
        .catch(error => {
            throw(error);
        })

        this.handleClose()
        }
        else{
            event.preventDefault()
            alert('Body must not be blank')
            return false;

        }
    }

    render(){
        const { classes } = this.props
        return(
            <Fragment >
                <CommentButton className={classes.button} onClick={this.handleOpen} tip="Comment on Shout" color="white">
                    <Comment className={classes.button}/>
                </CommentButton>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Button className= {classes.closeButton} onClick={this.handleClose} >
                    <Close />
                    </Button>
                    <DialogTitle> 
                        Comment on Shout
                    </DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body"
                            type="text"
                            label="Comment!"
                            multiline
                            rows="3"
                            placeholder="Shout!"
                            onChange= {this.handleChange}
                            fullWidth
                            />
                            <Button type='submit' variant="contained"
                            >
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


export default (withStyles(styles)(PostComment))