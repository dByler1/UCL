import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api.js';

class EditProfile extends Component {

    state = {
        businessData: [],
        business_name: '',
        service_category: '',
        address_street: "",
        address_city: "",
        address_state: "",
        address_zip: "",
        phone_number: "",
        service_counties: "",
        value_prop: ""

    };

    componentDidMount() {
        this.getBusinessData()
    }

    getBusinessData = () => {
        API.getBusinessByUserID()
            .then(res => {
                this.setState({ businessData: res.data[0] });
                console.log(res.data)
                //console.log(this.state)
            })
            .catch(err => console.log(err));

    }


    handleInputChange = event => {
        //alert("I've been called"); this works, the onChange is working
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });      
    };

    handleFormSubmit = event => {
        event.preventDefault();
         
            
            API.editBusinessProfile({
                
                business_name: this.state.business_name,
                service_category: this.state.service_category,
                address_street: this.state.address_street,
                address_city: this.state.address_city,
                address_state: this.state.address_state,
                address_zip: this.state.address_zip,
                phone_number: this.state.phone_number,
                service_counties: this.state.service_counties,
                value_prop: this.state.value_prop
                
            })
                .then(res => {
                    this.props.history.push("/profile")
                })
                .catch(err => console.log(err));
        
        console.log("Edit Profile state - handle form submit: ", this.state);
    };

    render() {
        return (



            <div className="container">
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Business Address and Contact Info
                            </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <form action="/register" method="post" >
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="business_name" placeholder={"Business Name: " + this.state.businessData.business_name} value={this.state.business_name} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="service_category" placeholder={"Service Category: " + this.state.businessData.service_category} value={this.state.service_category} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="phone_number" placeholder="Phone Number" value={this.state.phone_number} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="service_counties" placeholder="Service Counties" value={this.state.service_counties} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="value_prop" placeholder="Value Proposition" value={this.state.value_prop} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type='text' name="address_street" placeholder="Street" value={this.state.address_street} onChange={this.handleInputChange} />
                                    </div>
                                    <div className="form-row">
                                        <div className="col-7">
                                            <input type="text" className="form-control" type='text' name="address_city" placeholder="City" value={this.state.address_city} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" type='text' name="address_state" placeholder="State" value={this.state.address_state} onChange={this.handleInputChange} />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" type='text' name="address_zip" placeholder="Zip" value={this.state.address_zip} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
        
                                    <button className="btn btn-default btn-primary" type='submit' onClick={this.handleFormSubmit}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                  
                </div>
            </div>
        );
    }
}
export default withRouter(EditProfile);