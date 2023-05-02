import { api } from "./configs/axiosConfig";

export const BuildingAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/areas?type=building`,
            method: "GET",
        })

        return response.data
    },

}