import { api } from "./configs/axiosConfig";

export const LoginAPI = {
    login: async function (item, cancel = false) {
        try {
            const response = await api.request({
                url: `/api/auth/login`,
                method: "POST",
                data: item,
            })
            return response.data
        } catch (err) {
            console.log("error login: ", err)
        }
    },


    verifyToken: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/auth/verify`,
            method: "POST",
            data: item,
        })

        return response.data
    },
}