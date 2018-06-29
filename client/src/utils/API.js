import axios from "axios";

export default {
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
    getSearchResults: function() {
        return axios.get()
    }
};
