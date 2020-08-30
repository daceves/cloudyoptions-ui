import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {SignInRequest} from './LoginAPI'


class Login extends React.Component<{}, MyState> {
    state = { 
        authReady: false,
        isLoggedIn: false,
        profileImage: '',
        userName: '',
    };

    onSuccess = (googleUser: googleUserObject) => {
        var profile = googleUser.getBasicProfile();
        SignInRequest(googleUser.getAuthResponse().id_token).then(()=>{
            this.setState({
                isLoggedIn:true,
                profileImage:profile.getImageUrl(),
                userName: profile.getName()
            })
        });

        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        console.log(googleUser.getAuthResponse().id_token)
        

        //Need to send the request to backend. Wait for 201 or 200.
    }

    signOut = () => {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(()=> {
            console.log('User signed out.');
            this.setState({
                profileImage: '',
                userName: '',
                isLoggedIn: false,
            })
        });
    }

    loadAuthApi() {
        //Loading google api js object to window object.
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.onload = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: '740164561913-sjupbaofgfgtfhsm5ggo6lnqj38akrcm.apps.googleusercontent.com'
                }).then((val: object) => {
                    this.setState({ authReady: true })
                    this.buildButtons();
                })
            })
        };
        document.body.appendChild(script);
    }

    buildButtons() {
        window.gapi.signin2.render('google-sign-in-button', {
            onsuccess: this.onSuccess
        });
    }

    componentDidMount() {
        this.loadAuthApi();
    }

    render() {
        return (
            <div>
                {this.state.authReady &&
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        {!this.state.isLoggedIn ? 
                            <Button id='google-sign-in-button'></Button> :
                            <Avatar alt={this.state.userName} src={this.state.profileImage}></Avatar>
                        }
                        <Button variant="outlined" color="primary" onClick={this.signOut}>Sign out</Button>
                    </Grid>}
            </div>
        );
    }
}

export default Login;

interface MyState {
    authReady: boolean; // like this
    isLoggedIn: boolean;
    profileImage: string;
    userName:string;
};
type googleUserObject = {
    getBasicProfile: any;
    getAuthResponse: any;
}
declare global {
    interface Window {
        gapi: any;
    }
}