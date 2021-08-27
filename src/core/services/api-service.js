import axios from "axios";
import store from "../../store/index";

const URL = "http://localhost:3000/";
const GlobalErrorHandler = function (err){
    // HANDLE API ERRORS HERE like 403 / 401 - unauthorised. To log out client
    console.log(err);
    if (err && err.response.status === 403 || err.response.status === 401) {
        store.dispatch("Auth/signOut");
    }else {
        console.log("Server not available");
    }
}

class ApiService {
    static async authenticate(payload) {
        return await this.GeneratePostRequest("authorize", payload);
    }

    static async verifyToken(token) {
        return await this.GeneratePostRequest("verify", {token});
    }


    static async GenerateGetRequest(endpoint, data) {
        let req = null;
        try {
            req = await axios({
                method: 'get',
                url: URL + endpoint,
                headers: {'authorization': `Bearer ${store.getters["Auth/token"]}`},
                params: {
                    ...data
                }
            });
        } catch (err) {
            GlobalErrorHandler(err);
        }
        if (req && req["data"])
            req = req["data"];

        return req;
    }

    static async GeneratePostRequest(endpoint, data) {
        let req = null;
        try {
            req = await axios({
                method: 'post',
                url: URL + endpoint,
                headers: {'authorization': `Bearer ${store.getters["Auth/token"]}`},
                data: {
                    ...data
                }
            })
        } catch (err) {
            GlobalErrorHandler(err);
        }
        if (req && req["data"])
            req = req["data"];

        return req;
    }
}

export default ApiService;