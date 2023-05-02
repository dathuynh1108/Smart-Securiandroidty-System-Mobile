import { api } from "./configs/axiosConfig";

export const CameraConfigAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/cameras`,
            method: "GET",
        })

        return response.data
    },

    update: async function (item, cancel = false) {
        const response = await api.request({    
            url: `/api/cameras/${item._id}`,
            method: "PUT",
            data: item,
        })

        return response.data
    },

    create: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/cameras`,
            method: "POST",
            data: item,
        })

        return response.data
    },

    delete: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/cameras/${item._id}`,
            method: "DELETE",
            data: item,
        })

        return response.data
    },

}