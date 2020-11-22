import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class Login extends React.Component {

    constructor(){
        super()
        this.state = {

        }
    }
     handleInputChange = (event) => {
        this.setState({
           [event.target.name]: event.target.value
        })
    }
    
     handleLogin = (event) => {
        event.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
    
        fetch('http://localhost:3000/login', reqObj)
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                alert(data.error)}
                else{
                        localStorage.setItem('token', data.token)
                        this.props.history.push('/home')
                }
            }
        )
    }
    
     goSignUp = () => {
        this.props.history.push('/signup')
    }
    
     goHome = () => {
        this.props.history.push('/home')
        return null
    }
    render(){
        const {classes} = this.props

        return (             
            <Container component="main" maxWidth="xs">
              <Typography variant="h4" id="welcome">
                Welcome to
              </Typography>
              <Typography variant="h1" component="h1" id="title">
                ShoutRandomly
              </Typography>
              <Typography>
                Where you can Shout Randomly and have all your friends see!
              </Typography>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form onSubmit={(event) => this.handleLogin(event)} className={classes.form} noValidate>
                <TextField
                  onChange={ (event) => {this.handleInputChange(event)}}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={ (event) => {this.handleInputChange(event)}}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  
                  <Grid item>
                    <Link onClick={this.goSignUp}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
            </Box>
          </Container>
        );
    }
}

export default withStyles(styles)(Login);