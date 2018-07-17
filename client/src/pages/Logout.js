import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';

class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        

            API.logoutUser({
            }).then(res => {
                console.log(res);
                this.props.history.push("/");
                // this.history.pushState(null, 'login');
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <h1>Logout Page</h1>
                
                <form action="/login" method="post" style={ {'maxWidth': '300px'} }>
                  
                    <div className="form-group">
                       
                        <button className="btn btn-default" type='submit' onClick={this.handleFormSubmit}>Submit</button>&nbsp;
                        
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(Login);