import { reduce_image_file_size, resizeImage } from "../images/convertImage";

export const mapperCameraConfigFromFEToDB = (values, optionsCameraType, optionsEventType) => {
    console.log("MAPPER: ", values, optionsCameraType, optionsEventType)
    let connect_camera_type = "", connect_event_type = "";
    connect_camera_type = optionsCameraType.filter(item => item.camera_type_name == values.camera_type)[0]._id;
    connect_event_type = optionsEventType.filter(item => item.event_name == values.event_name)[0]._id;
    console.log("find id: ", connect_camera_type, connect_event_type);

    return {
        ...values,
        // "_id": item._id ? item._id,
        "camera_name": values.camera_name,
        "status": values.status,
        "rtsp_stream_url": 1,
        "sfu_rtsp_stream_url": 1,
        "camera_type": connect_camera_type,
        "event_type": connect_event_type,
        "offset_x_begin ": values.offsetXBegin,
        "offset_x_end ": values.offsetXEnd,
        "offset_y_begin ": values.offsetYBegin,
        "offset_y_end ": values.offsetYEnd,
        "is_set_line ": values.offsetXBegin ? true : false,
        "username ": 1,
        "password ": 1,
    }
}

export const mapperListCameraConfigFromFEToDB = (items) => {
    return items.map(item => mapperCameraConfigFromFEToDB(item));
}

export const mapperIoTConfigFromFEToDB = (iotConfig, optionsIoTType, optionsEventType) => {
    let connect_iot_type = optionsIoTType.filter(item => item.iot_device_type_name == iotConfig.device_type)[0]._id;
    let connect_event_type = optionsEventType.filter(item => item.event_name == iotConfig.event_name)[0]._id;

    return {
        ...iotConfig,
        "iot_device_name": iotConfig.device_name,
        "zone": iotConfig.config_zone,
        "event_type": connect_event_type,
        "status": "free",
        "iot_device_type": connect_iot_type,
    }
}

export const mapperListIoTConfigFromFEToDB = (items) => {
    return items.map(item => mapperCameraConfigFromFEToDB(item));
}


export const mapperAreaFromFEToDB = (item) => {
    return {
        ...item,
        "area_name": item.name,
        "address": item.address,
        "map_url": item.url,
        "parent_area": null,
        "floor_number": null,
        "lat": item.lat,
        "lng": item.lng,
        "area_type": item.type,
        "floor_level": null,
    }
}

export const mapperListAreaConfigFromFEToDB = (items) => {
    return items.map(item => mapperAreaFromFEToDB(item));
}


export const mapperBuildingFromFEToDB = (item) => {
    // console.log("reduce_image_file_size(item.url);: ", )
    // let new_size = await reduce_image_file_size(item.url);
    // console.log("new size: ", new_size);

    return {
        ...item,
        "area_name": item.name,
        "address": item.address,
        "map_url": item.url,
        "parent_area": item.area_id,
        "floor_number": item.floor_number,
        "lat": item.lat,
        "lng": item.lng,
        "area_type": item.type,
        "floor_level": null,
    }
}

export const mapperListBuildingConfigFromFEToDB = (items) => {
    return items.map(item => mapperBuildingFromFEToDB(item));
}

export const mapperFloorFromFEToDB = (item) => {
    return {
        ...item,
        "area_name": item.name,
        "address": item.address,
        "map_url": item.url,
        "parent_area": item.building_id,
        "floor_number": null,
        "lat": item.lat,
        "lng": item.lng,
        "area_type": item.type,
        "floor_level": item.floor_level,
    }
}

export const mapperListFloorConfigFromFEToDB = (items) => {
    return items.map(item => mapperFloorFromFEToDB(item));
}

export const mapperCameraMapFromFEToDB = (item, floors = []) => {
    let area_value = '';
    if (item.building_id == -1) {
        area_value = item.area_id;
    } else if (item.building_id != -1 && item.floor_level == -1) {
        area_value = item.building_id;
    } else {
        area_value = item.floor_id;
    }
    return {
        ...item,
        "camera_name": item.name,
        "address": item.address,
        "lat": item.lat,
        "lng": item.lng,
        "type": item.type,
        "connect_camera": item.connect_camera,
        "observe_iot": item.observe_iot,
        "area": area_value,
    }
}

export const mapperListCameraMapConfigFromFEToDB = (items, floors = []) => {
    return items.map(item => mapperCameraMapFromFEToDB(item, floors));
}

export const mapperIoTMapFromFEToDB = (item) => {
    let area_value = '';
    if (item.building_id == -1) {
        area_value = item.area_id;
    } else if (item.building_id != -1 && item.floor_level == -1) {
        area_value = item.building_id;
    } else {
        area_value = item.floor_id;
    }
    return {
        ...item,
        "iot_device_name": item.name,
        "address": item.address,
        "lat": item.lat,
        "lng": item.lng,
        "type": item.type,
        "observed_status": item.observed_status,
        "connect_iot": item.connect_iot,
        "area": area_value,
    }
}

export const mapperListIoTMapConfigFromFEToDB = (items) => {
    return items.map(item => mapperIoTMapFromFEToDB(item));
}

export const mapperListDeviceMapConfigFromFEToDB = (items) => {
    return items.map((item) => {
        if (item.type == 'camera') {
            return mapperCameraMapFromFEToDB(item);
        }
        return mapperIoTMapFromFEToDB(item);
    })
}