import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';
import  {Link} from "react-router-dom";

class Register extends Component {

    state = {
        business_name: '',
        service_category: '',
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
        if (this.state.username && this.state.password) {
            API.registerUser({
                business_name: this.state.business_name,
                service_category: this.state.service_category,
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                
                this.props.history.push("/profile/")
            })
            .catch(err => console.log(err));
        }
        console.log(this.state.service_category);
        
    };

    render() {
        return (
            <div className="container">
                <h1>Register Page</h1>
                <p className="lead">Please enter your credentials below.</p>
                <form action="/register" method="post" style={{ 'maxWidth': '300px' }}>
                    <div className="form-group">
                        <input className="form-control" type='text' name="business_name" placeholder='Business Name' value={this.state.business_name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type='text' name="service_category" placeholder='What is your service category' value={this.state.service_category} onChange={this.handleInputChange}  />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type='text' name="username" placeholder='Email' value={this.state.username} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type='password' name="password" placeholder='Password' value={this.state.password} onChange={this.handleInputChange} />    
                    </div>

                            
                    <button className="btn btn-default btn-primary" type='submit' onClick={this.handleFormSubmit}>Submit</button>
                
                
                </form>
            </div>
        );
    }
}
export default withRouter(Register);