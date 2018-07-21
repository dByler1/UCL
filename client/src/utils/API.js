import axios from "axios";

//do all router call here

export  default {
    // Gets all books
    getUser: function () {
        return axios.get("/auth/user");
    },
    getUserID: function () {
        return axios.get("/auth/userID");
    },
    getBusinessByUserID: function () {
       
        return axios.get("/auth/business/byUserID");
    },
    editBusinessProfile: function (updatedData) {
        console.log("api edit business data: ", updatedData)
        return axios.post("/business/editProfile",  updatedData);
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
    getBusinessData: function(businessID) {
        return axios.get("/getBusinessData/" + businessID)
    },
    getSearchResults: function (searchTerm) {
        console.log("api get search results method: " + searchTerm)
        return axios.get("/getSearchResults/" + searchTerm)
    },
    fetchInitalData: function() {
      return 'done'; 
    },
    fetchSearchResults: function() {
        return null
    }
};
