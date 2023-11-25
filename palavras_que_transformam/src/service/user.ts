import moment from "moment"
import User from "../store/application/model/user"
import { IAxiosResponse } from "../store/duck/root.types"
import axiosInstance from "./axiosInstance"

class UserService {
  public async getAll(): Promise<IAxiosResponse<User[]>> {
    return axiosInstance
      .get(`/users`)
      .then((response) => {
        return {
          data: response.data.map((data: any) => new User().fromJSON(data)),
          headers: response.headers
        }
      })
  }
  public async create(newUser: User): Promise<IAxiosResponse<User>> {
    return axiosInstance
      .post(`/users`, newUser.toJSON())
      .then((response) => {
        return {
          data: new User().fromJSON(response.data),
          headers: response.headers
        }
      })
  }
  public async update(newUser: User): Promise<IAxiosResponse<User>> {
    return axiosInstance
    .put(`/users/${newUser.id}`,{...newUser.toJSON(), update_at: moment()})
    .then((response) => {
        console.log(response,"user service", newUser)
        return {     
          data: new User().fromJSON(response.data)
        }
      })
  }
  public async getById(userId: string): Promise<IAxiosResponse<User>> {
    return axiosInstance
      .get(`/users/${userId}`)
      .then((response) => {
        return {
          data: new User().fromJSON(response.data),
          headers: response.headers
        }
      })
  }
}
export default new UserService()