export const mapperEventsUtils = (items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes, endIdx = 0) => {
    // console.log("data passed to MONITOR: ", items, iotConfigs, eventTypes, iotMaps, cameraMaps, areas, buildings, floors, iotTypes)
    return items.slice(0, endIdx).map(event => {

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
            created_at: new Date(event.created_at).toISOString(),

            video_url: event.detection_image_url ? event.detection_image_url : 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9712908078.jpeg'
        }
    })
}