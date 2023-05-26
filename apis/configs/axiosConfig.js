import axios from "axios"
export const sfuAddress = "wss://smartss.click/controller/ws"

export const api = axios.create({
    // baseURL: "https://pokeapi.co/api/v2",
    baseURL: "https://smartss.click/api-gateway",
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    const statusCode = error.response?.status

    if (error.code === "ERR_CANCELED") {
        notification.error({
            placement: "bottomRight",
            description: "API canceled!",
        })
        return Promise.resolve()
    }

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    // do something with RESPONSE error
    return errorHandler(error)
})