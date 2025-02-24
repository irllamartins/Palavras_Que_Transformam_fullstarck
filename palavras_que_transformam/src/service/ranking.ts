import moment from "moment"
import {NewUser, User} from "../store/application/model/user"
import { IAxiosResponse } from "../store/duck/root.types"
import axiosInstance from "./axiosInstance"

class RankingService {
  public async getYears(): Promise<IAxiosResponse<any[]>> {
    return axiosInstance
      .get(`/ranking/last-year`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async getWeekly(): Promise<IAxiosResponse<any[]>> {
    return axiosInstance
      .get(`/ranking/last-weekly`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async getUser(): Promise<IAxiosResponse<any[]>> {
    return axiosInstance
      .get(`/ranking/user`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
}
export default new RankingService()