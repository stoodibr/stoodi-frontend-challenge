import axios from "axios"

const URL_BASE_API_DEV = 'https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/'

export const apiRequest = axios.create({
    baseURL: URL_BASE_API_DEV,
    timeout: 5000,
})