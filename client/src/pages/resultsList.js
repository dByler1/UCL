import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';
import '../css/search.css'

class ResultsList extends Component {
    state = {
        businessData: { 
            business_name:"" 
        }
    };

    componentDidMount() {
        this.getSearchResults();
    }

    getSearchResults = () => {
        // api call
        API.getSearchResults()
            .then(res => {
                this.setState( { businessData: res.data } );
                console.log(res.data);
                console.log(this.state);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="main">
            <div className="searchBox">
                <input type="text" placeholder="Search.."/>
            </div>
            <div className="result">
                <img src="./img/ownerpic.jpeg"/>
                <div className="bizInfo">
                    <h3>Dave's Counseling Services</h3>
                    <span>Bridgeport</span>
                    <span>A school for those that need schoolin</span>
                </div>
            </div>
        </div>
        )
    }

}

export default withRouter(ResultsList);