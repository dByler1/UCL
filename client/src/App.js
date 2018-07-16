import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/app.css';
import Search from './pages/Search.js'
import ResultsList from './pages/ResultsList';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
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

const routes = [
  {
    //this is the base page for the user who is searching for a service
    //this page will take the user input and render/redirect/switch <Link to the SearchList
    //the MVP user input is the search term
    //expansion is the zip code
    path: '/',
    component: Search
  },
  {
    //this page provides the list results AND can take a new search term
    //initial data necessary is the search results from the user search input
    //the search functionality should be a seperate component since it will be used in two views
    path: '/search',
    component: ResultsList,
    fetchInitialData: (searchResults) => util.fetchSearchResults(searchResults),
  },
  {
    //this page displays the information of the business the user selected on the search page, or was directly navigated <Link to
    //the url must contain the business name
    //initial data - business data AND is logged in or not, plus related data if true
    path: '/profile',
    component: Profile,
    fetchInitialData: (id) => util.getBusinessData(id),
    //{<Link toDO: second initial data - is the user logged in or not}
  },
  {
    //this page is reached if the service provider logs in from any access point
    //initial data is the auth data AND the related business data
    path: '/editProfile',
    component: EditProfile,
    fetchInitialData: (id) => util.getAuthData(id),
    //{<Link toDO: second initial dtaa - related business data}
  },
  {
    //this page renders if a user clicks the sign up link from any point
    //MVP only service providers sign up
    //later - users who sign up can post reviews and save business profiles
    path: '/login',
    component: Login
  },
  {
    //this page renders if a user clicks the sign up link from any point
    //MVP only service providers sign up
    //later - users who sign up can post reviews and save business profiles
    path: '/register',
    component: Register
  }

];

class App extends React.Component {
 render() {
   return(
    <Router>
      <div>
     
        <nav className="loginNav navbar navbar-expand-lg navbar-dark bg-primary">

          <Link className="navbar-brand" to="/"> Home </Link>
          <Link className="navbar-brand" to="/search"> Search </Link>
          <Link className="navbar-brand" to="/profile"> Profile </Link>
          <Link className="navbar-brand" to="/register">Register</Link>
          <Link className="navbar-brand" to="/login">Login</Link>
          <Link className="navbar-brand" to="/editProfile">Edit Profile</Link>
        </nav> 

        {routes.map(({path, component: C, fetchInitialData }) => (
          <Route 
            exact path={path}
            render={(props) => <C {...props} fetchInitialData={fetchInitialData} />}
            />
        ))}
      </div>
      </Router>

   )
 }
  
}

export default App;
