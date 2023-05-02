import { api } from "./configs/axiosConfig";

export const FloorAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/areas?type=floor`,
            method: "GET",
        })

        return response.data
    },

}