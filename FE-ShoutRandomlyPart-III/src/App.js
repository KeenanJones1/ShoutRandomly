import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// Pages
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import MyShouts from './components/MyShouts'
// Profile

// Theme
const theme = createMuiTheme({
  palette: {
    primary: {light: '#D9042B', main: '#D97904', dark: '#012340', contrastText: "#00000f"}, 
    secondary: {
      light: "#f05545",
      main: "#F2D5C4",
      dark: "#8C031C",
      contrastText: '#ffffff'
    }
  }
})



class App extends React.Component{
  constructor(){
    super()

    this.state = {
      login: false,
      userInfo: {
        shouts: [],
        comments: [],
        username: "",
        bio: ''
      },
      
      followed_shouts: [],
      followed_users: [],
    }
  }


  componentDidMount(){
        
      }

      login = () => {
        this.setState({
          login: true
        })
      }

      logout = () => {
        this.setState({
          login: false
        })
      }

      setShouts = (shouts) => {
        this.setState({
          ...this.state.userInfo, shouts: shouts
        })

        console.log("App state from setShouts ", this.state.shouts)
      }

      setUserInfo = (userInfo) => {
        this.setState({
          userInfo : userInfo
        })
      }

      
        render(){           
          return (
            <div className="App">
              <MuiThemeProvider theme={theme}>
                <Router>
                  { this.state.login || localStorage.getItem('token') ? <NavBar logout={this.logout} setUserInfo={this.setUserInfo}  setShouts = {this.setShouts}/> : null}
                  <div className= "container">
                    <Switch>
                      <Route exact path= '/home' render={ (props) => <Home userInfo={this.state} login = {this.login} {...props} />}/>
                      <Route exact path= "/myShouts" render={ (props) => <MyShouts shouts={this.state.userInfo.shouts} comments={this.state.userInfo.comments} {...props}/> } />
                      <Route exact path='/signup'  component={Signup}/>
                      <Route exact path='/' login = {this.login} component={Login}/>
                    </Switch>
                  </div>
                </Router>
              </MuiThemeProvider>
            </div>
            );
          }
        }

export default App;
