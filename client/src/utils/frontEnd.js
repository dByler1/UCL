import axios from "axios";

//do all front end api calls here

export default {
    getUser: function () {
        return axios.get("/auth/check");
    }
}