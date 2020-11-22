import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

 class SignUp extends React.Component {
    constructor(){
        super()
        this.state = {
  
        }
    }

    handleInputChange = (event) => {
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    handleForm = (event) => {
        event.preventDefault()
        const signupObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch('http://localhost:3000/signup', signupObj)
        .then( resp => resp.json())
        .then(data =>
            {if(data.error){alert(data.error)}
                else{
                    localStorage.setItem('token', data.token)
                    this.props.history.push('/home')
                }
            }
        )
    }
 
    goLogin = () => {
        this.props.history.push('/')
    }
 
    

    render(){
        const { classes } = this.props

        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form onSubmit={(event) => {this.handleForm(event)} } className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                    onChange={(event) => {this.handleInputChange(event)}}
                      autoComplete="fname"
                      name="first_name"
                      variant="outlined"
                      required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                    onChange={(event) => {this.handleInputChange(event)}}
                      variant="outlined"
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField                     
                      onChange={(event) => {this.handleInputChange(event)}}
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username "
                      name="username"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(event) => {this.handleInputChange(event)}}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                
                    <TextField
                    onChange={(event) => {this.handleInputChange(event)}}
                      autoComplete="fname"
                      name="bio"
                      variant="outlined"
                      required
                      fullWidth
                      id="bio"
                      label="bio"
                      autoFocus
                    />
                  
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link onClick={this.goLogin} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
        );
    }
}

export default withStyles(styles)(SignUp);