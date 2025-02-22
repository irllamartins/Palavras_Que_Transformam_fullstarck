import moment from "moment"
import {NewUser, User} from "../store/application/model/user"
import { IAxiosResponse } from "../store/duck/root.types"
import axiosInstance from "./axiosInstance"

class UserService {
  public async getAll(): Promise<IAxiosResponse<User[]>> {
    return axiosInstance
      .get(`/users`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async create(newUser: NewUser): Promise<IAxiosResponse<User>> {
    return axiosInstance
      .post(`/users`, newUser)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
  public async update(newUser: User): Promise<IAxiosResponse<User>> {
    return axiosInstance
    .put(`/users/${newUser.id}`,{...newUser, update_at: moment()})
    .then((response) => {
        return {     
          data: response.data
        }
      })
  }
  public async getById(userId: string): Promise<IAxiosResponse<User>> {
    return axiosInstance
      .get(`/users/${userId}`)
      .then((response) => {
        return {
          data: response.data,
          headers: response.headers
        }
      })
  }
}
export default new UserService()