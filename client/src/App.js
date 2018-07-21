import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/app.css';
import Search from './pages/Search.js'
import ResultsList from './pages/ResultsList';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Logout from './pages/Logout.js';
import Navbar from './Components/Nav.js';


//{<Link toDO: get these API calls set up}
//{<Link toDO: expand business model <Link to accept additional input}
import util from './utils/api.js';

//{<Link toDO: build out page components}

//tu<Link torial source: https://www.youtube.com/watch?v=By7vJuSPaYo
//tu<Link torial source: https://www.youtube.com/watch?v=nmbX2QL7ZJc
//tu<Link torial source: https://tylermcginnis.com/react-router-pass-props-<Link to-components/



class App extends React.Component {
  
  constructor () {
    super();

    this.state = {
      loggedIn: false,
      results: []
      
    }
  }


  updateLoginStatus(r) {

    
    this.setState({
      loggedIn: r
    });
    
    console.log("IVE BEEN TRIGGERED!!")
  }

 render() {
 
   return(
    <Router>
      <div> 

          <Navbar loggedIn={this.state.loggedIn} />

           <Route 
            exact path='/'
            render={(routeProps) =>
              <Search {...routeProps}/>
            }
            /> 
          <Route 
            exact path='/search'
            render={(props) => <ResultsList {...props} fetchInitialData={(searchResults) => util.fetchSearchResults(searchResults)} />}
            /> 
          <Route 
            path='/profile'
            render={(props) => <Profile {...props} fetchInitialData={() => util.getUserID()} />}
            /> 
          <Route 
            exact path={'/editProfile'}
            render={(props) => <EditProfile {...props} fetchInitialData={(id) => util.getBusinessData(id)} />}
            />

         <Route 
            exact path={'/register'}
            render={(props) => <Register updateLoginStatus={this.updateLoginStatus.bind(this)} {...props} />}
            />
          <Route 
            exact path={'/login'}
            render={(props) => <Login updateLoginStatus={this.updateLoginStatus.bind(this)} {...props} />}
            />
          <Route 
            exact path={'/logout'}
            render={(props) => <Logout updateLoginStatus={this.updateLoginStatus.bind(this)} {...props} />}
            />
      </div>
      </Router>

   )
 }
  
}

export default App;
