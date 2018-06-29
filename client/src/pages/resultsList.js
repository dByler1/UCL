import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/API';

class Profile extends Component {
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
            <div className="container">
                <header>
                    <div>
                        <button><a href="/register.html">Register</a></button>
                        <button>Login</button>
                        <button>Logout</button>
                    </div>
                    <div class="container">
                        <div class="jumbotron">
                            <div class="jumbo-media">
                                <img src="img/UCL-reverse.jpg" />
                            </div>
                            <h1>UNIVERSAL CHIMNEY LINING</h1>
                        </div>
                    </div>
                </header>
            </div>
        )
    }

}

export default withRouter(Profile);