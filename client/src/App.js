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
//import Home from './pages/Home';
//import Login from './pages/Login';
//import NoMatch from './pages/NoMatch';

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

  componentDidMount () {
        
    util.getUser().then(res => {
      if (res.data) {
        console.log("user is logged in")
        this.setState( {
          loggedIn: true
        })
      } else {
        console.log("user is NOT logged in")
        this.setState( {
          loggedIn: false
        })
      }
    })
}

shouldComponentUpdate(nextProps, nextState) {
  console.log("testing right here")
  console.log(nextState);
  if(nextState.loggedIn) {
    return true
  }
 }

 render() {
 
   return(
    <Router>
      <div>
     
        <nav className="loginNav navbar navbar-expand-lg navbar-dark bg-primary">

          <Link className="navbar-brand" to="/"> Home </Link>
          <Link className="navbar-brand" to="/search"> Search </Link>
          <Link className="navbar-brand" to="/profile"> Profile </Link>


          {
            this.state.loggedIn
            ?
            <div>
              <Link className="navbar-brand" to="/logout">Logout</Link>
              <Link className="navbar-brand" to="/editProfile">Edit Profile</Link>
            </div>
            :
            <div>
              <Link className="navbar-brand" to="/login">Login</Link>
              <Link className="navbar-brand" to="/register">Register</Link>
            </div>
          }
        </nav> 

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
            exact path='/profile'
            render={(props) => <Profile {...props} fetchInitialData={(id) => util.getBusinessData(id)} />}
            /> 
          <Route 
            exact path={'/editProfile'}
            render={(props) => <EditProfile {...props} fetchInitialData={(id) => util.getBusinessData(id)} />}
            />

         <Route 
            exact path={'/register'}
            render={(props) => <Register {...props} />}
            />
          <Route 
            exact path={'/login'}
            render={(props) => <Login {...props} />}
            />
          <Route 
            exact path={'/logout'}
            render={(props) => <Logout {...props} />}
            />
      </div>
      </Router>

   )
 }
  
}

export default App;
