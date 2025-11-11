import axios from 'axios'
import { API_END_POINTS } from '../Constants/EndPoints'
import { API_CONFIG } from '../Constants/apis'

const AxiosInstance = axios.create({
    baseURL:API_CONFIG.BASE_URL,
    timeout:API_CONFIG.TIME_OUT
})


AxiosInstance.interceptors.request.use(
    (req)=>{
        const token = localStorage.getItem(API_CONFIG.TOKEN)
        if(token){
            req.headers[API_CONFIG.AUTHORIZATION] = `${API_CONFIG.BEARER} ${token}`
        }
        return req
    }
)

AxiosInstance.interceptors.response.use(
    response =>{
        if(response.headers[API_CONFIG.AUTHORIZATION] != undefined){
            localStorage.setItem("token" , response.headers[API_CONFIG.AUTHORIZATION])
        }
        return response
    },
     error =>{
        return Promise.reject(error)
    }
)

export default AxiosInstance;