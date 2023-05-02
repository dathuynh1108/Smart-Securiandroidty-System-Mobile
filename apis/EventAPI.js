import { api } from "./configs/axiosConfig";

export const EventAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/events`,
            method: "GET",
        })
        return response.data
    },

    update: async function (item, cancel = false) {
        const response = await api.request({
            url: ``,
            method: "PUT",
            data: item,
        })

        return response.data
    },

    create: async function (item, cancel = false) {
        const response = await api.request({
            url: ``,
            method: "POST",
            data: item,
        })

        return response.data
    },

    delete: async function (item, cancel = false) {
        const response = await api.request({
            url: ``,
            method: "DELETE",
            data: item,
        })

        return response.data
    },
}