import React from 'react'
import Shout from './Shout'
import withStyles from '@material-ui/core/styles/withStyles';
import {Typography} from '@material-ui/core'

const styles = theme => ({
    card: {height: '20vh'},
    title: {
        border: '2px solid',
        height: '5vh',
        width: '100%',
       backgroundColor: '#b71c1c',
    },
    user:{border: 'solid 2px', margin: '20px'},
    container: { overflow: 'scroll', height: '50vh', width: '50vw', border: 'double 20px', borderBottom: '2px, solid' , margin: '130px, 190px, 90px', padding: 10, backgroundColor: theme.palette.primary.dark},
    profile: {
        '& .image-wrapper': {
            textAlign: 'center', 
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image':{
            width: 50,
            height: 50,
            objectFit: 'center',
            maxWidth: '100%',
            // borderRadius: '80%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                versionAlign: 'middle'
            },
            '& a':{
                color: theme.palette.primary.main
            }
        }, 
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover':{
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px, 10px'
        }
    },
    loading: {
        color: 'white',
    }
})


class ShoutFeed extends React.Component{
    constructor(){
        super()
        this.state = {
            shouts: [],
            renderState: false,
        }
    }


    componentDidMount(){
        const token = localStorage.getItem('token')
        const reqObj = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        }

        fetch('http://localhost:3000/shouts', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                shouts: data, renderState: true
                })
            }    
        )
        this.props.login()

    }

     renderShouts = () => {
        // check if there are shouts to render. 

        if ( this.state.shouts.length > 0){
            return  this.state.shouts.map( shout =>  <Shout shout={shout}/>)
        }
        else {
            return <Typography variant="h2" color="primary">Please Follow Someone to see their shouts</Typography>
        }
       
    }  


    render(){
        const { classes } = this.props
        return(
            <div>
                <Typography variant="h3" id="feed-title">
                    ShoutFeed
                </Typography>
                <div className= {classes.container}>
                    {this.state.renderState === true ? this.renderShouts() : <h1 className={classes.loading}>Loading...</h1>}  
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ShoutFeed)