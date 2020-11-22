import React, {Fragment} from 'react'
import Link from 'react-router-dom/Link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PostShout from './PostShout'
class NavBar extends React.Component{
   constructor(){
       super()
       this.state = {
        img: " ",
        bio: " ",
        username: " ",
        shouts: [],
        comments: [],
        rendered: false
       }
   }

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logout()
    }


    componentDidMount(){
        const token = localStorage.getItem('token')
            const reqObj = {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            }

            fetch('http://localhost:3000/myuser', reqObj)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    shouts: data.shouts, comments: data.comments, rendered: true, username: data.username, img: data.imgUrl, bio: data.bio
                    })
                    this.props.setUserInfo(this.state)
                }    
            )

           
            //   send this state to the app and pass that to the MyShouts to render shouts. 

    }

    setShouts = (shouts) => {
        this.setState({
            shouts: shouts
        })
    }


    render(){
        // console.log("NavBar props", this.props)
        return(
           <AppBar>
               <Toolbar className="nav-container">
                   <Button color='inherit' component={Link} to='/home'>Home</Button>
                   <Button color='inherit' component={Link} to="/myshouts">myShouts</Button>
                   <Fragment>
                       <PostShout shouts = {this.state.shouts} setShouts= {this.props.setShouts}/>
                    </Fragment>
                   <Button color='inherit' onClick={this.handleLogout} component={Link} to='/'>Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar