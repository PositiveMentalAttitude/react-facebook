import * as React from 'react';
var Promise = require('es6-promise').Promise;
var Fetch = require('whatwg-fetch');

export class LoginPopup extends React.Component<any, any> {
    popupRect: HTMLDivElement = null;
    coverRect: HTMLDivElement = null;

    constructor() {
        super();

    }

    Facebook = null;
    Google = null;
    auth2 = null;

    componentDidMount() {
        window["fbAsyncInit"] = () => {
            this.Facebook = window["FB"];

            this.Facebook.init({
                appId: '886151441513304',
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.6' // use graph api version 2.5
            });
        }
        // Load the facebook SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));

        window["start"] = () => {
            window["gapi"].load('auth2',() => {
                window["auth2"] = window["gapi"].auth2.init({
                    client_id: "298056999707-hgsca4iq1pu2htvrsprt9ous8bhcfqr4.apps.googleusercontent.com"
                });
            });
        }

        // Load the google SDK asynchronously
        (function (d, s, id) {
            var js, gjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/client:platform.js?onload=start";
            gjs.parentNode.insertBefore(js, gjs);
        } (document, 'script', 'google-jssdk'))
    };

    handleLoginRequest() {
        //Handle login request when user users their own account
    }

    handleProblemRequest() {
        //Handle users login problem request
    }

    handleLoginWithFacebook() {
        //Handle users login with facebook request
        this.Facebook.login(function (response) {
            console.log(response);
            //Send user token to server

        }, { scope: 'public_profile,email' });
    }

    signI

    handleLoginWithGoogle() {
        window["auth2"].grantOfflineAccess({'redirect_uri': 'postmessage'}).then((auth) => function (auth) {
            console.log(auth);
        })
    }

    handleRegisterRequest() {
        //Handle users register request
    }

    onOutSidePopupClick(e: React.MouseEvent) {
        //Turn off popup when user click outside 
    }

    render() {
        return (
            <div className = "login-cover-area" ref = {(d) => this.coverRect = d}>
                <div className = "login-popup" ref = {(d) => this.popupRect = d}>
                    <input className = "user-email" type="text" placeholder = "Your Email"/>
                    <input className = "user-password" type="password" placeholder = "Your Password"/>
                    <div className = "handle-login-request">
                        <button className = "login-button">
                            Login
                        </button>
                        <button className = "login-problem">
                            Have A Problem?
                        </button>
                    </div>
                    <div className = "login-with-facebook" onClick = {(e) => this.handleLoginWithFacebook() }>
                        Login With Facebook
                    </div>
                    <button className = "login-with-google" onClick = {(e) => this.handleLoginWithGoogle()}>
                        Login With Google
                    </button>
                    <button className = "create-new-accout">
                        Create New Accout
                    </button>
                </div>
                <div className = "alert-toast">
                </div>
            </div>
        )
    }
}