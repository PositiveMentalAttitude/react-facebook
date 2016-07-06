///<reference path="../typings/index.d.ts"/>

import * as React from 'react';
var Promise = require('es6-promise').Promise;
var Fetch = require('whatwg-fetch');

export class LoginWindow extends React.Component<any, any> {
    userEmail: HTMLInputElement = null;
    userPassword: HTMLInputElement = null;
    userPasswordConfirm: HTMLInputElement = null;
    root = 'http://jsonplaceholder.typicode.com/posts/1/comments';

    constructor() {
        super();
        this.state = {
            loginWithFB: false,
            createAccount: false
        };
    };

    // Load the SDK asynchronously

    Facebook = null;

    componentDidMount() {
        window["fbAsyncInit"] = () => {
            this.Facebook = window["FB"];

            this.Facebook.init({
                appId: '886151441513304',
                cookie: true,  // enable cookies to allow the server to access 
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use graph api version 2.5
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
    };

    handleLoginFacebook() {
        this.Facebook.login(function (response) {
            console.log(response);
            //Send user token to server

        }, { scope: 'public_profile,email' });
    };

    handleCreateAccount() {
        //Show creating account window
        this.state.createAccount = true;
        if (this.state.createAccount) {
            document.getElementById("create-account-id").style.opacity = "1";
        }
    };

    cancelCreateAccount() {
        this.state.createAccount = false;
        if (!this.state.createAccount) {
            document.getElementById("create-account-id").style.opacity = "0";
        }
    }

    handleFetchDataToServer() {
        var myHeader = new Headers();
        var userEmailContent = this.userEmail.value;
        var userPasswordContent = this.userPassword.value;
        var userPasswordConfirmContent = this.userPasswordConfirm.value;

        myHeader.append("user-email", userEmailContent);
        myHeader.append("user-password", userPasswordContent);
        myHeader.append("user-password-confirm", userPasswordConfirmContent);

        var myInit = {
            method: 'POST',
            headers: myHeader,
            mode: 'cors',
            cache: 'default'
        };

        //Fetch Data
        var myRequest = new Request(this.root);
        fetch(myRequest, myInit).then((response: IResponse) => {
            return response.json();
        }).then(json=>{
            console.log(json);
        });
    }

    createAccountWindow() {
        return (
            <div className = "create-account" id = "create-account-id">
                <div className = "user-input-info">
                    <input className = "user-email user-input" type="text" placeholder = "Your Email" ref = {(d) => this.userEmail = d}/>
                    <input className = "user-password user-input" type="password" placeholder = "Your Password" ref = {(d) => this.userPassword = d}/>
                    <input className = "user-password-confirm user-input" type="text" placeholder = "Confirm Your Password" ref = {(d) => this.userPasswordConfirm = d}/>
                </div>
                <button className = "register-button" onClick = {(e) => this.handleFetchDataToServer() }>
                    Register
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className = "cover-area">
                <div className = "main-area">
                    <div className="login-window">
                        <div className = "title-name">
                            Login Window
                        </div>
                        <div className = "user-infor">
                            <input className = "user-name" type="text" placeholder = "Enter your ID"/>
                            <input type="password" className = "user-password" placeholder = "Password"/>
                        </div>
                        <div className = "login-options">
                            <div className = "fb-login" onClick = {(e) => this.handleLoginFacebook() }>
                                <p>Login With Facebook</p>
                            </div>
                            <div className = "create-account-button" onClick = {(e) => this.handleCreateAccount() }>
                                <p>Create An Account</p>
                            </div>
                        </div>
                    </div>
                    {this.createAccountWindow() };
                </div>
            </div>
        )
    };
}