import axios from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

class Error {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

export default {
    get: function(endpoint, success_callback, error_callback, params = {}) {
        instance.get(endpoint, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                console.log(error.message);
                if(error.message == "Network Error") {
                    error_callback(new Error("NETWORK", error))
                } else {
                    error_callback(new Error(error.code, error.data));
                }
            });
    },
    post: function(endpoint, data, success_callback, error_callback, params = {}) {
        instance.post(endpoint, data, { params: params })
            .then(function(response) {
                console.log(response);
                if (response.status == 201) {
                    success_callback(response.data);
                } else {
                    error_callback(new Error(response.status, response.data));
                }
            })
            .catch(function(error) {
                if(error.message == "NetworkError") {
                    error_callback(new Error("NETWORK", error))
                } else {
                    error_callback(new Error(error.code, error.data));
                }
            });
    },
    put: function(endpoint, data, success_callback, error_callback, params = {}) {
        instance.put(endpoint, data, { params: params })
            .then(function(response) {
                success_callback(response.data);
            })
            .catch(function(error) {
                if(error.message == "NetworkError") {
                    error_callback(new Error("NETWORK", error))
                } else {
                    error_callback(new Error(error.code, error.data));
                }
            });
    },
    del: function(endpoint, success_callback, error_callback) {
        instance.delete(endpoint)
            .then(function(response) {
                console.log(response.status);
                success_callback(response.data);
            })
            .catch(function(error) {
                console.log(error);
                if(error.message == "NetworkError") {
                    error_callback(new Error("NETWORK", error))
                } else {
                    error_callback(new Error(error.code, error.data));
                }
            });
    }
}