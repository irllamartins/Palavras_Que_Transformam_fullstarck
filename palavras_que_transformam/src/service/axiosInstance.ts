import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
})
axiosInstance.defaults.withCredentials = true

export default axiosInstance