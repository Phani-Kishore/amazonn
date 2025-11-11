import AxiosInstance from '../Apis/axiosInstance'
import { API_END_POINTS } from '../Constants/EndPoints'


export const SignupApi = async(data) =>{
    return await AxiosInstance.post(API_END_POINTS.SIGNUP, data)
}

export const SigninApi = async(data) =>{
    return await AxiosInstance.post(API_END_POINTS.SIGNIN, data)
}