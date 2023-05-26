import { IP_ADDRESS } from "../../apis/configs/axiosConfig";

// items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes, endIdx = 0
export const mapperEventsUtils = (items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes, endIdx = 0, cameraConfigs, cameraTypes) => {
    // console.log("data passed to MONITOR: ", items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes)

    console.log("mapperEventsUtils: ", items.length)

    return items?.slice(0, endIdx).map(event => {

        if (event.iot_device) {
            // console.log("HAVE IOT DEVICE FIELD: ", event)

            let iot_config_name = '', iot_map_name = '', area_id = '', area_name = '', building_name = '', floor_name = '', address = '', iot_type_id = '', iot_type_name = '', event_type_id = '', event_name = '', area_obj = {}, building_id = '', floor_level = ''
            for (let i = 0; i < iotConfigs.length; i++) {
                if (event.iot_device == iotConfigs[i].id) {
                    iot_config_name = iotConfigs[i].name;
                    iot_type_id = iotConfigs[i].iot_device_type;
                    event_type_id = iotConfigs[i].event_type;
                    break;
                }
            }

            for (let i = 0; i < iotMaps.length; i++) {
                if (iotMaps[i].connect_iot == event.iot_device) {
                    iot_map_name = iotMaps[i].name
                    address = iotMaps[i].address;
                    area_id = iotMaps[i].area;
                    break;
                }
            }


            for (let i = 0; i < iotTypes.length; i++) {
                if (iot_type_id == iotTypes[i].id || iot_type_id == iotTypes[i]._id) {
                    iot_type_name = iotTypes[i].iot_device_type_name;
                    break;
                }
            }

            for (let i = 0; i < eventTypes.length; i++) {
                if (event_type_id == eventTypes[i].id || event_type_id == eventTypes[i]._id) {
                    event_name = eventTypes[i].event_name;
                    break;
                }
            }

            let allAreas = areas.concat(buildings);
            allAreas = allAreas.concat(floors);

            for (let i = 0; i < allAreas.length; i++) {
                if (area_id == allAreas[i].id) {
                    area_obj = allAreas[i];
                    area_name = area_obj.name;
                    break;
                }
            }

            if (area_obj.type == 'area') {
                area_id = area_obj.id;
                building_id = -1;
                floor_level = -1;
            } else if (area_obj.type == 'building') {
                area_id = area_obj.area_id;
                building_id = area_obj.id;
                floor_level = -1;
            } else if (area_obj.type == 'floor') {
                area_id = area_obj.area_id;
                building_id = area_obj.building_id;
                floor_level = area_obj.floor_level;
            }


            return {
                ...event,
                event_name,
                address,
                device_name: iot_map_name,
                iot_type_name,

                area_id,
                building_id,
                floor_level,
                area_name,
                // created_at: new Date(event.created_at).toISOString(),
                event_time: event.created_at ? new Date(event.created_at).toString() : "No time",
                created_at: event.created_at ? new Date(event.created_at).toString() : "No time",
                key: event._id,


                normal_image_url: event.normal_image_url ? event.normal_image_url.replace('localhost', IP_ADDRESS) : '',

                video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg',



                detection_image_url: event.detection_image_url ? event.detection_image_url.replace('locahost', IP_ADDRESS) : '',
            }
        } else {
            let iot_config_name = '', iot_map_name = '', area_id = '', area_name = '', building_name = '', floor_name = '', address = '', iot_type_id = '', iot_type_name = '', event_type_id = '', event_name = '', area_obj = {}, building_id = '', floor_level = '', device_name = ''
            for (let i = 0; i < cameraMaps.length; i++) {
                if (event.camera_map == cameraMaps[i]._id || event.camera_map == cameraMaps[i].id) {
                    area_id = cameraMaps[i].area_id;
                    address = cameraMaps[i].address;
                    device_name = cameraMaps[i].camera_name;
                    break;
                }
            }

            for (let i = 0; i < areas.length; i++) {
                if (area_id == areas[i]._id || area_id == areas[i].id) {
                    area_name = areas[i].area_name;
                    break;
                }
            }


            for (let i = 0; i < cameraConfigs.length; i++) {
                if (event.camera == cameraConfigs[i]._id || event.camera == cameraConfigs[i].id) {
                    event_type_id = cameraConfigs[i].event_type;
                    iot_type_id = cameraConfigs[i].camera_type;
                    break;
                }
            }

            for (let i = 0; i < eventTypes.length; i++) {
                if (event_type_id == eventTypes[i]._id || event_type_id == eventTypes[i].id) {
                    event_name = eventTypes[i].event_name;
                    break;
                }
            }

            for (let i = 0; i < cameraTypes; i++) {
                if (iot_type_id == cameraTypes[i]._id) {
                    iot_type_name = cameraTypes[i].camera_type_name;
                    break;
                }
            }

            return {
                ...event,
                event_name,
                address,
                device_name: device_name,
                iot_type_name,

                area_id,
                building_id,
                floor_level,
                area_name,
                // created_at: new Date(event.created_at).toISOString(),
                // created_at: new Date(event.event_time).toISOString(),
                created_at: event.event_time ? new Date(event.event_time).toString() : "No time",
                key: event._id,


                normal_image_url: event.normal_image_url ? event.normal_image_url.replace('localhost', IP_ADDRESS) : '',

                zone: event.zone ? event['zone'] : 'Không có',
                video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg',
                normal_video_url: event.normal_video_url ? event.normal_video_url.replace('controller', 'localhost') : '',

                detection_image_url: event.detection_image_url ? event.detection_image_url.replace('locahost', IP_ADDRESS) : '',
            }
        }
    })
}



export const mapperEventsUtilsForDashboard = (items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes, endIdx = 0, cameraConfigs, cameraTypes) => {
    // console.log("data passed to MONITOR: ", items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes)
    if (!items) return [];

    return items.slice(items.length - endIdx, items.length).map(event => {

        if (event.iot_device) {
            // console.log("HAVE IOT DEVICE FIELD: ", event)

            let iot_config_name = '', iot_map_name = '', area_id = '', area_name = '', building_name = '', floor_name = '', address = '', iot_type_id = '', iot_type_name = '', event_type_id = '', event_name = '', area_obj = {}, building_id = '', floor_level = ''
            for (let i = 0; i < iotConfigs.length; i++) {
                if (event.iot_device == iotConfigs[i].id) {
                    iot_config_name = iotConfigs[i].name;
                    iot_type_id = iotConfigs[i].iot_device_type;
                    event_type_id = iotConfigs[i].event_type;
                    break;
                }
            }

            for (let i = 0; i < iotMaps.length; i++) {
                if (iotMaps[i].connect_iot == event.iot_device) {
                    iot_map_name = iotMaps[i].name
                    address = iotMaps[i].address;
                    area_id = iotMaps[i].area;
                    break;
                }
            }


            for (let i = 0; i < iotTypes.length; i++) {
                if (iot_type_id == iotTypes[i].id || iot_type_id == iotTypes[i]._id) {
                    iot_type_name = iotTypes[i].iot_device_type_name;
                    break;
                }
            }

            for (let i = 0; i < eventTypes.length; i++) {
                if (event_type_id == eventTypes[i].id || event_type_id == eventTypes[i]._id) {
                    event_name = eventTypes[i].event_name;
                    break;
                }
            }

            let allAreas = areas.concat(buildings);
            allAreas = allAreas.concat(floors);

            for (let i = 0; i < allAreas.length; i++) {
                if (area_id == allAreas[i].id) {
                    area_obj = allAreas[i];
                    area_name = area_obj.name;
                    break;
                }
            }

            if (area_obj.type == 'area') {
                area_id = area_obj.id;
                building_id = -1;
                floor_level = -1;
            } else if (area_obj.type == 'building') {
                area_id = area_obj.area_id;
                building_id = area_obj.id;
                floor_level = -1;
            } else if (area_obj.type == 'floor') {
                area_id = area_obj.area_id;
                building_id = area_obj.building_id;
                floor_level = area_obj.floor_level;
            }


            return {
                ...event,
                event_name,
                address,
                device_name: iot_map_name,
                iot_type_name,

                area_id,
                building_id,
                floor_level,
                area_name,
                // created_at: new Date(event.created_at).toISOString(),
                event_time: event.created_at ? new Date(event.created_at).toString() : "No time",
                created_at: event.created_at ? new Date(event.created_at).toString() : "No time",
                key: event._id,

                video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg'
            }
        } else {
            let iot_config_name = '', iot_map_name = '', area_id = '', area_name = '', building_name = '', floor_name = '', address = '', iot_type_id = '', iot_type_name = '', event_type_id = '', event_name = '', area_obj = {}, building_id = '', floor_level = '', device_name = ''
            for (let i = 0; i < cameraMaps.length; i++) {
                if (event.camera_map == cameraMaps[i]._id || event.camera_map == cameraMaps[i].id) {
                    area_id = cameraMaps[i].area_id;
                    address = cameraMaps[i].address;
                    device_name = cameraMaps[i].camera_name;
                    break;
                }
            }

            for (let i = 0; i < areas.length; i++) {
                if (area_id == areas[i]._id || area_id == areas[i].id) {
                    area_name = areas[i].area_name;
                    break;
                }
            }


            for (let i = 0; i < cameraConfigs.length; i++) {
                if (event.camera == cameraConfigs[i]._id || event.camera == cameraConfigs[i].id) {
                    event_type_id = cameraConfigs[i].event_type;
                    iot_type_id = cameraConfigs[i].camera_type;
                    break;
                }
            }

            for (let i = 0; i < eventTypes.length; i++) {
                if (event_type_id == eventTypes[i]._id || event_type_id == eventTypes[i].id) {
                    event_name = eventTypes[i].event_name;
                    break;
                }
            }

            for (let i = 0; i < cameraTypes; i++) {
                if (iot_type_id == cameraTypes[i]._id) {
                    iot_type_name = cameraTypes[i].camera_type_name;
                    break;
                }
            }

            return {
                ...event,
                event_name,
                address,
                device_name: device_name,
                iot_type_name,

                area_id,
                building_id,
                floor_level,
                area_name,
                // created_at: new Date(event.created_at).toISOString(),
                // created_at: new Date(event.event_time).toISOString(),
                created_at: event.event_time ? new Date(event.event_time).toString() : "No time",
                key: event._id,


                zone: event.zone ? event['zone'] : 'Không có',
                video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg',
                normal_video_url: event.normal_video_url ? event.normal_video_url.replace('controller', 'localhost') : '',

            }
        }
    })
}



// export const mapperEventsUtils = (items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes, endIdx = 0) => {
//     // console.log("data passed to MONITOR: ", items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes)
//     return items.slice(0, endIdx).map(event => {

//         let iot_config_name = '', iot_map_name = '', area_id = '', area_name = '', building_name = '', floor_name = '', address = '', iot_type_id = '', iot_type_name = '', event_type_id = '', event_name = '', area_obj = {}, building_id = '', floor_level = ''
//         for (let i = 0; i < iotConfigs.length; i++) {
//             if (event.iot_device == iotConfigs[i].id) {
//                 iot_config_name = iotConfigs[i].name;
//                 iot_type_id = iotConfigs[i].iot_device_type;
//                 event_type_id = iotConfigs[i].event_type;
//                 break;
//             }
//         }

//         for (let i = 0; i < iotMaps.length; i++) {
//             if (iotMaps[i].connect_iot == event.iot_device) {
//                 iot_map_name = iotMaps[i].name
//                 address = iotMaps[i].address;
//                 area_id = iotMaps[i].area;
//                 break;
//             }
//         }


//         for (let i = 0; i < iotTypes.length; i++) {
//             if (iot_type_id == iotTypes[i].id || iot_type_id == iotTypes[i]._id) {
//                 iot_type_name = iotTypes[i].iot_device_type_name;
//                 break;
//             }
//         }

//         for (let i = 0; i < eventTypes.length; i++) {
//             if (event_type_id == eventTypes[i].id || event_type_id == eventTypes[i]._id) {
//                 event_name = eventTypes[i].event_name;
//                 break;
//             }
//         }

//         let allAreas = areas.concat(buildings);
//         allAreas = allAreas.concat(floors);

//         for (let i = 0; i < allAreas.length; i++) {
//             if (area_id == allAreas[i].id) {
//                 area_obj = allAreas[i];
//                 area_name = area_obj.name;
//                 break;
//             }
//         }

//         if (area_obj.type == 'area') {
//             area_id = area_obj.id;
//             building_id = -1;
//             floor_level = -1;
//         } else if (area_obj.type == 'building') {
//             area_id = area_obj.area_id;
//             building_id = area_obj.id;
//             floor_level = -1;
//         } else if (area_obj.type == 'floor') {
//             area_id = area_obj.area_id;
//             building_id = area_obj.building_id;
//             floor_level = area_obj.floor_level;
//         }


//         return {
//             ...event,
//             event_name,
//             address,
//             device_name: iot_map_name,
//             iot_type_name,

//             area_id,
//             building_id,
//             floor_level,
//             area_name,
//             // created_at: new Date(event.created_at).toISOString(),
//             event_time: new Date(event.event_time).toISOString(),

//             video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg'
//         }
//     })
// }