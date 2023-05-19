
export const convertDate = (date) => {
    let dd = date.getDate().toString();
    let mm = (parseInt(date.getMonth()) + 1).toString();
    let yyyy = date.getFullYear().toString();

    let dateString = yyyy + '-' + (mm.length == 1 ? '0' + mm : mm) + '-' + (dd.length == 1 ? '0' + dd : dd);
    return dateString;
}

export const generateDropdownTreeSelectMap = async (dataBuildings, dataFloors, dataCameraDevices, dataIOTDevices) => {
    let devicesList = dataCameraDevices.concat(dataIOTDevices);
    let result = [];
    for (let i = 0; i < dataBuildings.length; i++) {
        let building = dataBuildings[i];
        let childrenOfBuilding = [];
        // floors
        for (let j = 0; j < dataFloors.length; j++) {
            let floor = dataFloors[j];
            if (floor.building_id == building.id) {
                let childrenOfFloor = [];
                for (let k = 0; k < devicesList.length; k++) {
                    if (devicesList[k].building_id == building.id && devicesList[k].floor_level == floor.floor_level) {
                        childrenOfFloor.push({ ...devicesList[k], id: devicesList[k].id, name: devicesList[k].name, sortNo: devicesList[k].id, parentId: floor.id, children: [] })
                    }
                }
                childrenOfBuilding.push({ ...floor, id: floor.id, name: floor.name, sortNo: floor.id, parentId: building.id, children: childrenOfFloor })
            }
        }
        // devices not belong to floor
        for (let k = 0; k < devicesList.length; k++) {
            if (devicesList[k].building_id == building.id && devicesList[k].floor_level == -1) {
                childrenOfBuilding.push({ ...devicesList[k], id: devicesList[k].id, name: devicesList[k].name, sortNo: devicesList[k].id, parentId: building.id, children: [] })
            }
        }
        result.push({ ...building, id: building.id, name: building.name, sortNo: building.id, parentId: "", children: childrenOfBuilding });
    }

    return result;
}


export const sortEventOnCreatedAt = (items) => {
    return items.sort(function (a, b) {
        // return (a.created_at > b.created_at) ? -1 : ((a.created_at < b.created_at) ? 1 : 0);
        // console.log("event time sorter: ", a.event_time, "    ", b.event_time);
        let time1 = new Date(a.event_time).toISOString();
        let time2 = new Date(b.event_time).toISOString();
        // console.log("time1,2 : ", time1, time2)
        // return (a.event_time > b.event_time) ? -1 : ((a.event_time < b.event_time) ? 1 : 0);
        return (time1 > time2) ? -1 : ((time1 < time2) ? 1 : 0);
    })
}
