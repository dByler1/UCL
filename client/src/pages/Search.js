import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';
import '../css/home.css';

class Search extends Component {
    state = {
        searchTerm: ""
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchTerm.length > 1) {
            API.getSearchResults(this.state.searchTerm)
                .then(res => {
                    this.props.history.push({ pathname: "/search/", state: { results: res.data } });
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        //do stuff with props here -- props are coming from APP.js
        return (
            
                <div className="container">

                    <div className="name">
                        <h1>General Listings</h1>
                    </div>
                    <div className="searchBox">
                        <input type="text" placeholder="Search for a service" name="searchTerm" value={this.state.searchTerm} onChange={this.handleInputChange} />
                        <button className="btn btn-default btn-primary" type='submit' onClick={this.handleFormSubmit}>Search</button>
                    </div>
                </div>
                )
    }

}

export default withRouter(Search);