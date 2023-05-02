import L from 'leaflet';
import logoBuilding from '../../assets/icons/building.svg'
import logoBuildingBlue from '../../assets/icons/building_blue.png'
import logoCamera from '../../assets/icons/cctv-camera.png'
import logoIOT from '../../assets/icons/sensor.png'
import logoIOTBlue from '../../assets/icons/sensor_blue.png'
import logoCameraBlue from '../../assets/icons/camera_blue.png'
import logoFloor from '../../assets/icons/floor_1.png'
import logoFloorBlue from '../../assets/icons/floor_blue.png'
import logoEarth from '../../assets/icons/earth.png'

export const greenIcon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

export const BuildingMarker = L.icon({
    iconSize: [45, 45],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: logoBuildingBlue,
});

export const FloorMarker = L.icon({
    iconSize: [35, 50],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: logoFloorBlue,
});

export const CameraMarker = L.icon({
    iconSize: [55, 55],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: logoCameraBlue,
});

export const IOTMarker = L.icon({
    iconSize: [45, 45],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: logoIOTBlue,
});

export const IconBuilding = () => {
    return (
        <img src={logoBuilding} style={{width: '15px', height: '15px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconBuildingLarge = () => {
    return (
        <img src={logoBuilding} style={{width: '20px', height: '20px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconCamera = () => {
    return (
        <img src={logoCamera} style={{width: '18px', height: '19px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconCameraLarge = () => {
    return (
        <img src={logoCamera} style={{width: '23px', height: '23px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconIOT = () => {
    return (
        <img src={logoIOT} style={{width: '18px', height: '19px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconIOTLarge = () => {
    return (
        <img src={logoIOT} style={{width: '23px', height: '23px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconFloor = () => {
    return (
        <img src={logoFloor} style={{width: '17px', height: '17px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconFloorLarge = () => {
    return (
        <img src={logoFloor} style={{width: '22px', height: '22px', marginRight: '5px', marginTop: '-2px'}} />
    )
}

export const IconEarth = () => {
    return (
        <img src={logoEarth} style={{width: '17px', height: '17px', marginRight: '5px', marginTop: '-2px'}} />
    )
}
