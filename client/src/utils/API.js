import axios from "axios";

//do all router call here

export  default {
    // Gets all books
    getUser: function () {
        return axios.get("/auth/check");
    },
    loginUser: function (loginData) {
        return axios.post("/auth/login/", loginData);
    },
    // Saves a business to the database
    registerUser: function (registerData) {
        return axios.post("/register", registerData);
    },
    logoutUser: function () {
        return axios.get("/auth/logout/");
    },
    getBusinessData: function() {
        return axios.get("/getBusinessData")
    },
    getSearchResults: function (searchTerm) {
        console.log(searchTerm)
        return axios.get("/getSearchResults/" + searchTerm)
    },
    fetchInitalData: function() {
      return 'done'; 
    },
    fetchSearchResults: function() {
        return null
    }
};
