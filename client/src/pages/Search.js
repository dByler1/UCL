import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/API';

class Search extends Component {
    
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            API.registerUser({
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                this.props.history.push("/results:id")
            })
            .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Search for the service you need</label>
                        <input type="text" className="form-control" id="mainSearch" aria-describedby="serviceSearch" placeholder="Search for the service you need"/>
                        <small id="emailHelp" className="form-text text-muted">Search for the service you need</small>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Search</button>
            </form>
          </div>
        )
    }

}

export default withRouter(Search);