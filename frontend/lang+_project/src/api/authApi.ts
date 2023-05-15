import axios, { AxiosPromise, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

let refreshTokenPromise: Promise<void | AxiosResponse<any, any>> | null = null;

async function getRefreshToken() {
    return await authApi
        .post(
            "auth/refresh-token", 
            {}
        )
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.error(error)
        })
}

authApi.interceptors.response.use(response => response, async error => {
    if (error.response.status === 403) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = getRefreshToken()
                .then((response) => {
                    refreshTokenPromise = null;
                    return authApi(error.config)
                })
        }
    }
    else if (error.response.status === 444) {
        await authApi
            .post(
                "auth/logout", 
                {}
            )
        localStorage.removeItem("auth")
        alert("Refresh page and authenticate again! Your refresh token has expired.")
    }
    return Promise.reject(error)
})

export default authApi;