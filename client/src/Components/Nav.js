import React, { Component } from 'react';
import API from '../utils/api.js';

const Nav = () => (
    <nav className="loginNav navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">Home</a>
        <a className="navbar-brand" href="/search">Search</a>
        <a className="navbar-brand" href="/profile">Profile</a>
        <a className="navbar-brand" href="/register">Register</a>
        <a className="navbar-brand" href="/editProfile">Edit Profile</a>
    </nav> 
);

export default Nav;

  