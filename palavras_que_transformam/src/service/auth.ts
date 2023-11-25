import axiosInstance from "./axiosInstance"
/// oi
export const authSevice = () => ({
    validateToken: async (token: string) => {
        /* return {
             user: {
                 "id": 1,
                 "name": "irlla",
                 "email": "irlla@gmail.com",
                 "password": "123"
             },
         }*/
        const response = await axiosInstance.post("/validate", { token: token })
         return { user: {...response.data } }
    },
    signin: async (email: string, password: string) => {
        /* return {
             user: {
                 "id": 1,
                 "name": "irlla",
                 "email": "irlla@gmail.com",
                 "password": "123"
             },
             token: "123123123"
         }*/
        const response = await axiosInstance.post("/signin", { email, password })
        return response.data
    },
    logout: async () => {
        return { status: true }
        const response = await axiosInstance.post("/logout")
        return response.data

    }
})