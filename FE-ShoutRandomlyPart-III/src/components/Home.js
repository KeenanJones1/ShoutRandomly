import React from 'react'
import Profile from './Profile'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid  from '@material-ui/core/Grid';
import FindFollow from './Findfollow'
import ShoutFeed from './ShoutFeed'


const styles = (theme) => ({
    container: { 
         width:'100vw', height: '100vh', margin: '130px, 190px, 90px',
        position: 'relative',
        top: '20vh',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        position: 'relative',
        bottom: '10vh',
        left: '30vw'
    },
    home: {
        backgroundColor: theme.palette.secondary.main,
    },
    profile: {
        height: '50vh',
        position: 'relative',
        top: '9vh'
},

    follow: {
        position: 'relative',
        bottom: '40vh',

    }

})


class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            shouts: null,
            renderState: false,
            followings: []
        }
    }

    setFollowings = (followings) => {
        this.setState({
            following: followings
        })
    }



    
    render(){
      const { classes } = this.props

       

        return(
           <Grid container spacing={12} className={classes.home} >
                <Grid item sm={8} xs={12} className={classes.container}>

                    <ShoutFeed login={this.props.login} />
                </Grid>
                <Grid item sm={4} xs={6} className={classes.profile}>
                    <Profile />
                </Grid> 
                <Grid item sm={4} xs={6} container className={classes.follow}>
                    {/* <h1>Find a Follower</h1> */}
                    <FindFollow setFollowings={this.setFollowings} />
                </Grid>
           </Grid>
        )
    }
}

export default withStyles(styles)(Home); 