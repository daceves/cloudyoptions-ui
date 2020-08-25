import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authReady: false };
    }
    onSuccess = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    signOut = () => {
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    loadAuthApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";

        script.onload = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: '740164561913-sjupbaofgfgtfhsm5ggo6lnqj38akrcm.apps.googleusercontent.com'
                }).then(val => {
                    this.setState({ authReady: true })
                    this.buildButtons();
                })
            })
        };
        document.body.appendChild(script);
    }
    buildButtons() {
        window.gapi.signin2.render('google-sign-in-button', {
            width: 200,
            height: 50,
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
                    <div>
                        <div id='google-sign-in-button'></div>
                        <a href="#" onClick={this.signOut}>Sign out</a>
                    </div>}
            </div>
        );
    }
}

export default Login;
