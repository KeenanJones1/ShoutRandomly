import React, {Component, Fragment} from 'react'
import ShoutButton from './ShoutButton'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { AddCircle, Close } from '@material-ui/icons';


const styles = theme => ({
    submitButton: {
        position: 'relative'
    }, 
    closeButton: {
        position: 'absolute',
        left: '85%',
        top: '10%'
    }
})

class PostShout extends Component{
    constructor(){
        super()
        this.state = {
            open: false,
            body: '',
            error: "",
            shouts: []
        }
    }

    componentDidMount(){
        this.setState({
            shouts: this.props.shouts
        })
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
            body: JSON.stringify({body: body})
        }
        fetch(`http://localhost:3000/shouts`, postObj)
        .then(resp => resp.json())
        .then(data => 
            {  
                this.setState({shouts: data})
                this.props.setShouts(data)
                window.location.reload();
                }             
        )
        .catch(error => {
            throw(error);
        })
        this.handleClose()
        }
        else{
            event.preventDefault()
            alert('Shout must not be blank')
            return false;
        }
        
    }

    render(){
        // console.log("PostShout props", this.props)
        const { classes } = this.props
        return(
            <Fragment>
                <ShoutButton onClick={this.handleOpen} tip="Post a Shout!">
                    
                    <AddCircle />
                </ShoutButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <Button className= {classes.closeButton} onClick={this.handleClose} >
                    <Close />
                    </Button>
                    <DialogTitle> 
                        Post a new Shout
                    </DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body"
                            type="text"
                            label="Shout!"
                            multiline
                            rows="3"
                            placeholder="Shout!"
                            // error = {error.body ? true : false} 
                            // helperText={error.body}
                            
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


export default (withStyles(styles)(PostShout))