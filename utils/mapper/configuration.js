



// export const mapperEventTypeFromDatabaseToFE = (eventType) => {       // one object
//     return {
//         ...eventType,
//         "_id": eventType.id,
//     }
// }

// import { ConsoleSqlOutlined } from "@ant-design/icons"
import { AreaAPI } from "../../apis/AreaAPI"

export const mapperCameraTypeForSelectionFromDatabaseToFE = (cameraType) => {       // one object
    return {
        ...cameraType,
        "label": cameraType.camera_type_name,
        "value": cameraType.camera_type_name,
    }
}

export const mapperIOTTypeForSelectionFromDatabaseToFE = (iotType) => {       // one object
    return {
        ...iotType,
        "label": iotType.iot_device_type_name,
        "value": iotType.iot_device_type_name,
    }
}

export const mapperEventTypeForSelectionFromDatabaseToFE = (eventType) => {       // one object
    return {
        ...eventType,
        "label": eventType.event_name,
        "value": eventType.event_name,
    }
}



export const mapperListCameraConfigFromDatabaseToFE = (cameraConfigs, eventsType, cameTypes) => {       // one object
    console.log("cameraConfigs, eventsType, cameTypes: ", cameraConfigs, eventsType, cameTypes)
    for (let i = 0; i < cameraConfigs.length; i++) {
        let eventName = '', cameraType = '';
        for (let j = 0; j < eventsType.length; j++) {
            if (eventsType[j].id == cameraConfigs[i].connect_event_type) {
                eventName = eventsType[j].event_name;
                break;
            }
        }

        for (let j = 0; j < cameTypes.length; j++) {
            if (cameTypes[j].id == cameraConfigs[i].connect_camera_type) {
                cameraType = cameTypes[j].camera_type_name;
                break;
            }
        }

        cameraConfigs[i] = {
            ...cameraConfigs[i],
            "event_name": eventName,
            // "iot_type": iotType,
            "_id": cameraConfigs[i]._id,
            "camera_name": cameraConfigs[i].camera_name,
            "camera_type": cameraType,
            // "config_zone": cameraConfigs[i]['zone'],
        };
    }
    console.log("new camera config list: ", cameraConfigs);

    return cameraConfigs;
}

export const mapperListIOTConfigFromDatabaseToFE = (iotConfigs, eventsType, iotTypes) => {       // one object
    console.log("iotConfigs, eventsType, iotTypes: ", iotConfigs, eventsType, iotTypes)

    for (let i = 0; i < iotConfigs.length; i++) {
        let eventName = '', iotType = '';
        for (let j = 0; j < eventsType.length; j++) {
            if (eventsType[j]._id == iotConfigs[i].event_type) {
                eventName = eventsType[j].event_name;
                break;
            }
        }

        for (let j = 0; j < iotTypes.length; j++) {
            if (iotTypes[j]._id == iotConfigs[i].iot_device_type) {
                iotType = iotTypes[j].iot_device_type_name;
                break;
            }
        }

        iotConfigs[i] = {
            ...iotConfigs[i],
            "event_name": eventName,
            // "iot_type": iotType,
            "_id": iotConfigs[i]._id,
            "device_name": iotConfigs[i].iot_device_name,
            "device_type": iotType,
            "config_zone": iotConfigs[i]['zone'],
        };
    }
    console.log("new iot config list: ", iotConfigs);

    return iotConfigs;
}

export const mapperEventTypeFromDatabaseToFE = (item) => {
    return {
        ...item,
        "key": item.event_key,
        "event_name": item.event_name,
        "description": item.event_description
    }
}

export const mapperListEventTypeFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperEventTypeFromDatabaseToFE(item));
    return res;
}


export const mapperCameraTypeFromDatabaseToFE = (item) => {
    return {
        ...item,
        "_id": item._id,
        "camera_type_name": item.camera_type_name,
        "camera_type_description": item.description,
        "image_url": item.image_url,
    }
}

export const mapperListCameraTypeFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperCameraTypeFromDatabaseToFE(item));
    return res;
}

export const mapperIOTTypeFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "iot_type_name": item.iot_device_type_name,
        "iot_type_description": item.description,
        "image_url": item.image_url,
    }
}

export const mapperListIOTTypeFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperIOTTypeFromDatabaseToFE(item));
    return res;
}

export const mapperIOTConfigFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "name": item.iot_device_name,
        "created_at": "",
        "zone": item.zone,
        "status": item.status,
        "connect_event_type": item.event_type,
        "connect_iot_type": item.iot_device_type,
        "key": item._id,
    }
}

export const mapperIOTConfigListFromDatabaseToFE = (items) => {       // one object
    return items.map(item => mapperIOTConfigFromDatabaseToFE(item));
}

export const mapperIOTMapFromDatabaseToFE = (item) => {
    return {
        ...item,
        "id": item._id,
        "name": item.iot_device_name,
        "lat": item.lat,
        "lng": item.lng,
        "type": item.type,
        "observed_status": item.observed_status,
        "connect_iot": item.connect_iot ? item.connect_iot : "",
        "address": item.address,
        "building_id": "",
        "area_id": "",
        "floor_level": "",
    }
}

export const mapperListIOTMapFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperIOTMapFromDatabaseToFE(item));
    return res;
}


export const mapperEventDetailFromDatabaseToFE = (item, iotConfigs = []) => {
    let zoneValue = '';
    for (let i = 0; i < iotConfigs.length; i++) {
        if (item.iot_device == iotConfigs[i]._id) {
            zoneValue = iotConfigs[i]['zone'];
        }
    }
    return {
        ...item,
        "id": item._id ? item._id : item.id,
        "key": item._id ? item._id : item.id,
        "comment": item.comment,
        "true_alarm": item.human_true_alarm,
        "created_at": item.created_at,
        "confirm_status": item.event_status,
        "zone": zoneValue,        // need to find zone from this field
    }
}

export const mapperListEventDetailFromDatabaseToFE = (items, iotConfigs = []) => {
    let res = items.map(item => mapperEventDetailFromDatabaseToFE(item, iotConfigs));
    // console.log("mapperListEventDetailFromDatabaseToFE: ", res)
    return res;
}

export const mapperCameraConfigurationFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "key": item._id,
        "created_at": "",
        "name": item.camera_name,
        "type": "camera",
        // "status": item.status,
        "status": "free",
        "connect_event_type": item.event_type,
        "connect_camera_type": item.camera_type,
        "offsetXBegin": item.offsetXBegin,
        "offsetXEnd": item.offsetXEnd,
        "offsetYBegin": item.offsetYBegin,
        "offsetYEnd": item.offsetYEnd,
        "video_url": "",
    }
}

export const mapperListCameraConfigurationFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperCameraConfigurationFromDatabaseToFE(item));
    return res;
}

export const mapperCameraMapFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "name": item.camera_name,
        "lat": item.lat,
        "lng": item.lng,
        "type": item.type,
        "observe_iot": item.observe_iot ? item.observe_iot : "",
        "connect_camera": item.connect_camera ? item.connect_camera : "",
        "address": item.address,
        "building_id": "",
        "area_id": "",
        "floor_level": "",
    }
}

export const mapperListCameraMapFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperCameraMapFromDatabaseToFE(item));
    return res;
}

export const mapperAreaFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "name": item.area_name,
        "type": item.area_type,
        "lat": item.lat,
        "lng": item.lng,
        "address": item.address,
        "url": item.map_url,
    }
}

export const mapperListAreaFromDatabaseToFE = (items) => {
    let res = items.map(item => mapperAreaFromDatabaseToFE(item));
    return res;
}

export const mapperBuildingFromDatabaseToFE = (item) => {       // one object
    return {
        ...item,
        "id": item._id,
        "name": item.area_name,
        "area_id": item.parent_area,
        "floor_number": item.floor_number,
        "type": "building",
        "lat": item.lat,
        "lng": item.lng,
        "address": item.address,
        "url": item.map_url,
    }
}

export const mapperListBuildingFromDatabaseToFE = (items) => {
    let res = items.map((item) => {
        return mapperBuildingFromDatabaseToFE(item);
    });

    return res;
}

export const mapperFloorFromDatabaseToFE = (item, buildings = []) => {       // one object
    let area_id = '', building_id = '';
    for (let i = 0; i < buildings.length; i++) {
        if (item.parent_area == buildings[i]._id) {
            area_id = buildings[i].parent_area;
            building_id = item.parent_area;
            // console.log("here: ", area_id, building_id)
            break;
        }
    }

    return {
        ...item,
        "id": item._id,
        "name": item.area_name,
        "floor_level": item.floor_level,
        "area_id": area_id,
        "building_id": building_id,
        "type": "floor",
        "lat": item.lat,
        "lng": item.lng,
        "url": item.map_url,
    }
}

export const mapperListFloorFromDatabaseToFE = (items, buildings = []) => {
    let res = items.map(item => mapperFloorFromDatabaseToFE(item, buildings));
    return res;
}


export const mapperDeviceFromDatabaseToFE = (item, areas = [], buildings = [], floors = []) => {       // one object
    // console.log("item: ", item)

    let type = item.type;
    let listAllAreas = areas.concat(buildings);
    listAllAreas = listAllAreas.concat(floors);
    let area_id = '', building_id = '', floor_level = '';

    for (let i = 0; i < listAllAreas.length; i++) {
        if (item.area == listAllAreas[i]._id) {
            let area_type = listAllAreas[i].area_type;
            if (area_type == 'floor') {
                for (let j = 0; j < floors.length; j++) {
                    if (item.area == floors[j]._id) {
                        area_id = floors[j].area_id;
                        building_id = floors[j].building_id;
                        floor_level = floors[j].floor_level;
                        break;
                    }
                }
            } else if (area_type == 'building') {
                for (let j = 0; j < buildings.length; j++) {
                    if (item.area == buildings[j]._id) {
                        area_id = buildings[j].area_id;
                        building_id = buildings[j]._id;
                        floor_level = -1;
                        break;
                    }
                }
            } else {
                for (let j = 0; j < areas.length; j++) {
                    if (item.area == areas[j]._id) {
                        area_id = areas[j]._id;
                        building_id = -1;
                        floor_level = -1;
                        break;
                    }
                }
            }

            break;
        }
    }

    if (type == 'iot') {
        return {
            ...item,
            "id": item._id,
            "name": item.iot_device_name,
            "building_id": building_id,
            "area_id": area_id,
            "floor_level": floor_level,
            // "lat": 1,
            // "lng": 1,
            "type": "iot",
            // "address": 1,
            "observed_status": item.observed_status ? item.observed_status : '',
            "connect_iot": item.connect_iot ? item.connect_iot : "",
        }
    } else {


        return {
            ...item,
            "id": item._id,
            "name": item.camera_name,
            "building_id": building_id,
            "area_id": area_id,
            "floor_level": floor_level,
            // "lat": 1,
            // "lng": 1,
            "type": "camera",
            // "address": 1,
            "observe_iot": item.observe_iot ? item.observe_iot : "",
            "connect_camera": item.connect_camera ? item.connect_camera : "",
        }
    }
}

export const mapperListDeviceFromDatabaseToFE = (items, areas = [], buildings = [], floors = []) => {
    return items.map(item => mapperDeviceFromDatabaseToFE(item, areas, buildings, floors));
}

