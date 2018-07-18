import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';
import '../css/search.css'
import  {Link} from "react-router-dom";

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
           
                {
                    this.props.location.state && this.props.location.state.results ? 
                        this.props.location.state.results.map(user => 
                        <Link to={{
                            pathname: '/profile',
                            state: {businessID: user._id}
                            }} >
                        
                            <div className="result">
                                <img src="./img/ownerpic.jpeg" alt="owner profile"/>
                                <div className="bizInfo">
                                    <h3>{user.business_name}</h3>
                                    {/* <span></span> */}
                                    <span>{user.service_category}</span>
                                </div>
                            </div>
                      
                        </Link>
                        
                    ): <div> Go away! </div>
                }
                
            
        </div>
        )
    }

}

export default withRouter(ResultsList);