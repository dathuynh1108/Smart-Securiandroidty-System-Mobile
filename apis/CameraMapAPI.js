import { api } from "./configs/axiosConfig";

export const CameraMapAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/camera_maps`,
            method: "GET",
        })

        return response.data
    },

}