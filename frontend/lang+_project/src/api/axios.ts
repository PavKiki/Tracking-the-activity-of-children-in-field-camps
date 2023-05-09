import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 || error.response.status === 403) {
        const response = await api
            .post(
                "auth/refresh-token", 
                {}, 
                { withCredentials: true }
            )
        if (response.status === 200) return api(error.config)
    }
    else if (error.response.status === 444) {
        await api
            .post(
                "auth/logout", 
                {},
                { withCredentials: true }
            )
        localStorage.removeItem("auth")
        alert("Refresh page and authenticate again! Your refresh token has expired.")
    }
    return Promise.reject(error)
})

export default api