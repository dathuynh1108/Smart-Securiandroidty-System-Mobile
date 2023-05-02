import { api } from "./configs/axiosConfig";

export const IoTMapAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/api/iot_device_maps`,
            method: "GET",
        })

        return response.data
    },

}