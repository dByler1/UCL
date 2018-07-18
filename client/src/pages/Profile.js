import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api';
import '../css/profile.css';

class Profile extends Component {
    state = {
        businessData: { 
            business_name:""
        }
    };

    componentDidMount() {
        this.getBusinessData();
    }

    getBusinessData = () => {
        // api call
        (this.props.location.state && this.props.location.state.businessID) ?

        API.getBusinessData(this.props.location.state.businessID)
            .then(res => {
                this.setState( { businessData: res.data } );
                console.log(res.data);
                console.log(this.state);
            })
            .catch(err => console.log(err))

        : 
        API.getBusiness()
            .then(res => {
                this.setState( { businessData: res.data} );
                console.log(res)
                console.log(this.state)

            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <header>

                
                    <div className="container">
                        <div className="jumbotron">
                            <div className="jumbo-media">
                                <img src="../img/UCL-reverse.jpg" alt="logo"/>
                            </div>
                            <h1>{this.state.businessData.business_name}</h1>
                           
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default withRouter(Profile);