import React, { Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
    
})

class EditDetails extends React.Component{

    constructor(){
        super()
        this.state = {
            bio : "",
            open: false
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    onChange = (e) => {
        this.setState({
            bio: e.target.value
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify( {body: this.state.bio})
        }
        fetch(`http://localhost:3000/profile`, reqObj)
        .then(resp => resp.json())
        .then(data => {
                console.log(data); 
                this.props.updateUserInfo(data);
            }
        )

        this.handleClose()

    }

    render(){
       
        const { classes } = this.props;
        return(
            <Fragment>
                <Tooltip title="Edit Bio" placement="top" >
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Edit Your Bio
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit = {(event) => this.handleSubmit(event)}>
                            <TextField name="bio" type="text" label='bio' multiline rows='3' placeholder="A short Bio about Yourself" className={classes.TextField}
                            value ={this.state.bio} onChange={(event) => this.onChange(event)} fullWidth/>
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

export default (withStyles(styles)(EditDetails));