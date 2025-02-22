import moment from "moment"
import {Text} from "../store/application/model/text"
import { IAxiosResponse } from "../store/duck/root.types"
import axiosInstance from "./axiosInstance"

class TextService {
  public async getAll(userId:string): Promise<IAxiosResponse<Text[]>> {
    return axiosInstance
      .get(`/users/${userId}/texts`)
      .then((response) => {
        
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async create(newText: Text): Promise<IAxiosResponse<Text>> {

    return axiosInstance
      .post(`/users/${newText.user_id}/texts`, { ...newText, created_at: moment(), update_at: moment() })
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async getById(textId: string): Promise<IAxiosResponse<Text>> {
    return axiosInstance
      .get(`/texts/${textId}`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async updade(newText: Text): Promise<IAxiosResponse<Text>> {
    return axiosInstance
      .put(`users/${newText.user_id}/texts/${newText.id}`,{... newText, update_at:moment()})
      .then((response) => {
        console.log("service",response.data)
        return {
          data: response.data
        }
      })
  }
  public async remove(textId: string): Promise<IAxiosResponse<any>> {
   return axiosInstance
      .delete(`/texts/${textId}`)
  }
}
export default new TextService()