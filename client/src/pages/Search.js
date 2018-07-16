import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';
import '../css/home.css';
import util from '../utils/frontEnd.js';

class Search extends Component {

    

    handleFormSubmit = event => {
        event.preventDefault();

        
     
        // if (this.state.username && this.state.password) {
        //     API.registerUser({
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        //         .then(res => {
        //             this.props.history.push("/results:id")
        //         })
        //         .catch(err => console.log(err));
        // }
    };

    render() {
        //do stuff with props here -- props are coming from APP.js
        return (
            
                <div className="main">

                    <div className="name">
                        <h1>General Listings</h1>
                    </div>
                    <div className="searchBox">
                        <input type="text" placeholder="Search.." onClick={this.handleFormSubmit} />
                    </div>
                </div>
                )
    }

}

export default withRouter(Search);