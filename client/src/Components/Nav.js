import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/nav.css';


class Nav extends React.Component {

    render() {
        console.log("props for nav", this.props)
        return (
            <nav className="loginNav navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand .mr-auto" to="/">
                    <img className="navLogo" src={require('../img/GeneralListings.jpg')}/>
                </Link>
                {
                    this.props.loggedIn
                        ?
                        <div>
                            <Link className="navbar-brand" to="/profile"> Profile </Link>
                            <Link className="navbar-brand" to="/editProfile">Edit Profile</Link>
                            <Link className="navbar-brand" to="/logout">Logout</Link>
                        </div>
                        :
                        <div>
                            <Link className="navbar-brand" to="/login">Business Login</Link>
                            <Link className="navbar-brand" to="/register">Business Register</Link>
                        </div>
                }
            </nav> 
        )
    }


}

export default Nav;

  