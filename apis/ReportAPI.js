import { api } from "./configs/axiosConfig";

export const ReportAPI = {
    getAllEventStatisticCount: async function (cancel = false) {
        const response = await api.request({
            url: `/api/reports?action=find_all_event_statistic_count`,
            method: "GET",
        })

        return response.data
    },

    getNumberOfIoTEventByTypeAndTrueAlarm: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/reports?action=find_number_of_iot_event_by_type_and_true_alarm&area_id=${item.area_id}&start_time=${item.start_time}&end_time=${item.end_time}`,
            method: "GET",
        })

        return response.data
    },

    getNumberOfIoTEventByType: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/reports?action=find_number_of_iot_event_by_type&area_id=${item.area_id}&start_time=${item.start_time}&end_time=${item.end_time}`,
            method: "GET",
        })

        return response.data
    },

    getNumberOfIoTEventByInterval: async function (item, cancel = false) {
        const response = await api.request({
            url: `/api/reports?action=find_number_of_iot_event_by_interval&area_id=${item.area_id}&start_time=${item.start_time}&end_time=${item.end_time}&iot_device_type_id=${item.iot_device_type_id}&interval_type=${item.interval_type}`,
            method: "GET",
        })

        return response.data
    },
}