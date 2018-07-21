import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import API from '../utils/api';
import '../css/profile.css';

class Profile extends Component {
    state = {
        tab1Open: true,
        tab2Open: false,
        tab3Open: false,
        businessData: {
            business_name: ""
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
                    this.setState({ businessData: res.data });
                    console.log(res.data);
                    console.log(this.state);
                })
                .catch(err => console.log(err))

            :
            API.getBusinessByUserID()
                .then(res => {
                    this.setState({ businessData: res.data[0] });
                    console.log(res.data)
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
                                <img src={require('../img/GeneralListings.jpg')} alt="logo" />
                               
                            </div>
                            {console.log(this.state.businessData)}
                            <h1>{this.state.businessData.business_name}</h1>

                        </div>
                    </div>
                    <div className="background-image">
                        <div className="row header-first-row">
                            <div className="col col-md-6 offset-md-1 cta-btns">
                                <button type="button" className="btn btn-secondary btn-md btn-block header-btns" id="headerBtn1" value="Call"  >Call </button>
                                <button type="button" className="btn btn-secondary btn-md btn-block header-btns" id="headerBtn2" value="Request Call" data-toggle="modal" data-target="#requestCall">Request a Call </button>
                                <button type="button" className="btn btn-secondary btn-md btn-block header-btns" id="headerBtn3" value="Message" data-toggle="modal" data-target="#message">Message </button>
                            </div>
                            <div className="col col-md-4 mx-auto">
                                <div className="media d-flex justify-content-md-center">
                                    <figure className="figure">
                                        <img src={require('../img/ownerpic.jpeg')} className="figure-img img-fluid rounded profile-img" alt="Business Owner" />
                                    </figure>
                                </div>

                            </div>

                        </div>
                        <div className="row header-second-row">
                            <div className="col-10  offset-1">
                                <ul className="list-unstyled">
                                    <li className="media">

                                        <div className="media-body">
                                            <img className="" id="sat" src="img/satisfaction.png" alt="MainLogo" />
                                            <div className="business-info">
                                                <h5 className="mt-0 mb-1">{this.state.businessData.phone_number}</h5>
                                                <p><i>Certified, Licensed, and Insured</i></p>
                                                <h5 className="mt-0 mb-1">Serving {this.state.businessData.service_counties} Counties</h5>
                                                <p>"{this.state.businessData.value_prop}"</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </header>
            
                <div className="acordian-background">
                    <div className="row">
                        <div id="accordion" className="col-md-10 offset-md-1">
                            <div className="btn-group btn-group-lg d-flex bg-light">
                                <button type="button" className="btn btn-info btn-block open-button" data-parent="#accordion" data-target="#servicesCollapse" aria-expanded="true" aria-controls="collapseExample">Services</button>
                                <button type="button" className="btn btn-info btn-block open-button" data-parent="#accordion" data-target="#photosCollapse" aria-expanded="false" aria-controls="collapseExample">Photos</button>
                                <button type="button" className="btn btn-info btn-block open-button" data-parent="#accordion" data-target="#reviewsCollapse" aria-expanded="false" aria-controls="collapseExample">Reviews</button>
                            </div>
                            {/* <!-- SERVICES ACORDIAN  --> */} 
                            <div className={ (this.state.tab1Open === true ) ? 'collapse show' : 'collapse' } id="servicesCollapse" data-parent="#accordion">
                                <div className="accordion" id="servicesAccordion">
                                    
                                    {/* <!-- CHIMNEY LINER INSTALLATION  --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Chimney Liner Installation 
                                                </button>
                                            </h5>
                                        </div>
                                        
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#servicesAccordion">
                                            <div className="card-body">
                                                <div className="row">
                                                    
                                                    <div className="col-12">
                                                    We install both aluminum or stainless steel chimney lining systems. We do recommend stainless steel products for quality.
                                                    <br/>
                                                    <br/>
                                                    It is recommended that you install a new chimney liner in your chimney for one or more of the following reasons: 
                                                    <br/>
                                                    <br/>
                                                    <ul>
                                                        <li>Your appliance(s) are currently exhausting through a clay flue (pipe) system. These masonry flues develop cracks and holes over time. Excessive moisture from high efficiency appliance exhaust drastically accelerates masonry degradation which may lead to holes, blockages, and structural damage. </li>
                                                        <li>Heater flue is lined with old aluminum or other metal pipe that is showing signs of degradation.</li>
                                                        <li>No clay flue pipe exists in your chimney and so your appliances are venting through an open brick cavity. This is called "open chase" and is common in pre 1920's construction.</li>
                                                    </ul>
                                                    Price is set by the diameter of pipe needed to vent the total combined BTU input of appliances being vented as well as height/length of the liner. Additional cost may be included with the installations requiring extensive staging for chimney access as well as for chimney liners larger than 5.5" in diameter. 
                                                    <br/>
                                                    <br/>
                                                    * All 316Ti stainless steel chimney liners include a lifetime guarantee.
                                                    <br/>
                                                    <br/>
                                                        Prices include replacement of damaged/corroded galvanized connector piping for appliances. More material costs may be applied if excessive connector piping needs replacement. 
                                                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    {/* <!-- FREE ESTIMATES --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                            <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                Estimates are Free
                                            </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#servicesAccordion">
                                            <div className="card-body">
                                                Please call to schedule an estimate.
                                            </div>
                                        </div>
                                    </div>
            
                                    {/* <!-- CHIMNEY CERTIFICATIONS --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Chimney Certifications
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#servicesAccordion">
                                        <div className="card-body">
                                            Please call for inquiry
                                        </div>
                                        </div>
                                    </div>
            
                                    {/* <!-- CHIMNEY CLEANING --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingFour">
                                        <h5 className="mb-0">
                                            <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Cleaning
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#servicesAccordion">
                                        <div className="card-body">
                                            Cleaning includes a dry clean (sweep) to remove all loose creosote and soot in chimney flue system and fireplace system. 
                                            <ul>
                                                <li>Prefabricated Fireplace </li>
                                                <li>Masonry Fireplace</li>
                                                <li>Wood Stove</li>
                                                <li>Oil Burning Flue System</li>
                                            </ul>   
                                        </div>
                                        </div>
                                    </div>
            
                                    {/* <!-- CHIMNEY CAPS --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingFive">
                                            <h5 className="mb-0">
                                            <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                Chimney Caps
                                            </button>
                                            </h5>
                                        </div>
                                        <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#servicesAccordion">
                                            <div className="card-body">
                                                Price is determined by the size. Includes installation.
                                            </div>
                                        </div>
                                    </div>
            
                                    {/* <!-- CHIMNEY LINER FOR WOOD BURNING FIREPLACE --> */}
                                    <div className="card">
                                        <div className="card-header" id="headingSix">
                                            <h5 className="mb-0">
                                            <button className="btn collapsed btn-outline-primary btn-large btn-block" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                Chimney Liner for Wood Burning Fireplace
                                            </button>
                                            </h5>
                                        </div>
                                        <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#servicesAccordion">
                                            <div className="card-body">
                                                New chimney liners installed for wood burning fireplaces include a lifetime guarantee. These liners must be sized properly and insulated completely. A new chimney liner for a fireplace does not guarantee that your fireplace will draft properly. Please call with inquiries.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        {/* <!-- PHOTOS GALLERY --> */}
                        <div className="collapse" id="photosCollapse" data-parent="#accordion">
                                <section>
                                    <div className="media">
                                        <img src="img/Drawing-Stainless-Steel-Lining-page-001.jpg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/chimney-2.jpg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/kneeling_Fireplace_brush.jpeg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/house-2.jpg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/kneeling_Fireplace.jpeg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/chimney-1.jpg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/roof_chimney.jpeg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/steelPiping.jpeg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/house-1.jpg"/>
                                    </div>
                                    <div className="media">
                                        <img src="img/photos-page/stuffingPipe_roof.jpeg"/>
                                    </div>
            
            
                                    {/* <!-- NEW IMAGE HERE --> */}
            
                                    
                                    
                                
                                    <div className="media">
                                        <img src="img/photos-page/chimney-3.jpg"/>
                                    </div>
                            
                                </section>
                            </div>
            
            
                            {/* <!-- REVIEWS --> */}
                            <div className="collapse" id="reviewsCollapse" data-parent="#accordion">
                                <div className="card card-body">
                                    <div className="alert alert-primary" role="alert">
                                        View all our reviews at our <a href='https://www.google.com/search?source=hp&ei=eg0nW4HZK6Gc5wK-jbOYDQ&q=universal+chimney+lining+paoli+pa&oq=un&gs_l=mobile-gws-wiz-hp.1.0.41j0j0i131j0j0i131j0.2013.2399..3704...0....93.182.2......0....1.......3..46i131.MRz0DH7bNuQ%3D#lkt=LocalPoiReviews&trex=m_t:lcl_akp,rc_f:nav,rc_ludocids:11307769905993412514,rc_q:Universal%2520Chimney%2520Lining,ru_q:Universal%2520Chimney%2520Lining'>business google page here.</a>
                                    </div>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">Isaac installed a chimney liner at my house in East Falls a few years ago and the
                                                process was smooth, educational and personable...</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Drew M.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">...He was able to work with us on a last minute inspection and was extremely
                                                patient in helping us...</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Jamie P.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">I refer Isaac Windle to many of my clients. I always get great feedback.</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Brian S.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">Universal Chimney Lining was so great to work with!</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Jessica P.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">They installed a chimney liner at my house and their prices were better than other
                                                companies</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Jason T.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">Isaac installed a chimney lining in my 50 year old house. His work was impeccable
                                                and clean.</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Jack C.</cite></footer>
                                    </blockquote>
                                    <blockquote className="blockquote">
                                        <p className="mb-0">Very good job, clean and very professional.</p>
                                        <footer className="blockquote-footer"><cite title="Source Title">Edward B.</cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            {/* <!-- FLOATING ACTION BUTTON --> */}
    <div className="nav-float"> 
        <a href="#" className="float-btn" onclick="call()"></a>
    </div>

       
          </div>
        )
    }
}

export default withRouter(Profile);