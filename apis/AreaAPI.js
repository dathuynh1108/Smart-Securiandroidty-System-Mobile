import { api } from "./configs/axiosConfig";

export const AreaAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/areas?type=area`,
            method: "GET",
        })

        return response.data
    },

    getById: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/areas/${item._id}`,
            method: "GET",
        })

        return response.data
    },

}