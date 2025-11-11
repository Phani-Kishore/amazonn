import AxiosInstance from "../Apis/axiosInstance"
import { API_END_POINTS } from "../Constants/EndPoints"


export const AddressViewApi = async(data) =>{
    return await AxiosInstance.post(API_END_POINTS.ADDRESS_VIEW, data)
}