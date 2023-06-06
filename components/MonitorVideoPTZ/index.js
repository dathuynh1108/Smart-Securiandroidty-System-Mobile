import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import '../../styles/appStyles';
import dataNotifications from "../../utils/dummyData/notifications.json";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import VideoViewLivestream from "../VideoViewLivestream";
import logo from "../../assets/arrow-down.png";
import logoReset from "../../assets/reset-icon.png";
import logoZoomIn from "../../assets/zoom-in.png";
import logoZoomOut from "../../assets/zoom-out.png";
import logoSave from "../../assets/save-icon.png";
import { Image } from "react-native";
import { CameraConfigAPI } from "../../apis/CameraConfigAPI";



let props = {
    hostname: "tris.ddns.net",
    port: '8064',
    username: 'admin',
    password: 'Dientoan@123',
}

const screenHeight = Dimensions.get("window").height;

export default function MonitorVideoPTZ({ route, navigation }) {
    // console.log("video ptz: ", route.params)




    const [currentCoord, setCurrentCoord] = useState({
        x: 0.00,
        y: 0.00,
        z: 0.00,
        zoom: 0.00,
    })

    const getStatus = async (options) => {
        console.log("get status: ", options)
        CameraConfigAPI.put(
            {
                ...props,
                options: { ...options },
            },
            {
                action: "getStatus"
            }
        ).then(response => {
            console.log("response get status: ", response)
            if (response.status === 200) {
                const state = {
                    ...currentCoord
                }
                if (response.data?.position?.x != null) state.x = Math.round(response.data?.position?.x * 100) / 100
                if (response.data?.position?.y != null) state.y = Math.round(response.data?.position?.y * 100) / 100
                if (response.data?.position?.z != null) state.z = Math.round(response.data?.position?.z * 100) / 100
                if (response.data?.position?.zoom != null) state.zoom = Math.round(response.data?.position?.zoom * 100) / 100
                setCurrentCoord(state)
            } else {
                // openNotificationWithIcon("error", "Thông báo", response.message)
            }
        }).catch((err) => {
            console.log("ERR get status: ", err)
            // openNotificationWithIcon("error", "Thông báo", err.response?.data?.message)
        })
    }



    const relativeMove = async (x, y, z, zoom) => {
        let options = { x, y, z, zoom }
        console.log("relative move: ", props)
        console.log("relative move: ", options)
        CameraConfigAPI.put(
            {
                ...props,
                ...options,
            },
            {
                action: "relativeMove"
            }
        ).then(response => {
            if (response.status === 200) {
                // openNotificationWithIcon("success", "Thông báo", "Xoay camera thành công")
                setCurrentCoord({
                    x: Math.round((currentCoord.x + options.x) * 100) / 100,
                    y: Math.round((currentCoord.y + options.y) * 100) / 100,
                    z: Math.round((currentCoord.z + options.z) * 100) / 100,
                    zoom: Math.round((currentCoord.zoom + options.zoom) * 100) / 100
                })
            } else {
                // openNotificationWithIcon("error", "Thông báo", response.message)
            }
        }).catch((err) => {
            // openNotificationWithIcon("error", "Thông báo", err.response?.data?.message)
        })
    }
    const absoluteMove = async (x, y, z, zoom) => {
        let options = { x, y, z, zoom }
        CameraConfigAPI.put(
            {
                ...props,
                ...options,
            },
            {
                action: "absoluteMove"
            }
        ).then(response => {
            if (response.status === 200) {
                // openNotificationWithIcon("success", "Thông báo", "Xoay camera thành công")
            } else {
                // openNotificationWithIcon("error", "Thông báo", response.message)
            }
        }).catch((err) => {
            // openNotificationWithIcon("error", "Thông báo", err.response?.data?.message)
        })
    }

    const gotoHomePosition = (options) => {
        CameraConfigAPI.put(
            {
                ...props,
                options: { ...options },
            },
            {
                action: "gotoHomePosition"
            }
        ).then(response => {
            if (response.status === 200) {
                let state = {
                    ...currentCoord
                }
                console.log(response)
                if (response.data?.position?.x != null) state.x = Math.round(response.data?.position?.x * 100) / 100
                if (response.data?.position?.y != null) state.y = Math.round(response.data?.position?.y * 100) / 100
                if (response.data?.position?.z != null) state.z = Math.round(response.data?.position?.z * 100) / 100
                if (response.data?.position?.zoom != null) state.zoom = Math.round(response.data?.position?.zoom * 100) / 100
                setCurrentCoord(state)
                // openNotificationWithIcon("success", "Thông báo", "Về vị trí đã lưu thành công")
            } else {
                // openNotificationWithIcon("error", "Thông báo", response.message)
            }
        }).catch((err) => {
            // openNotificationWithIcon("error", "Thông báo", err.response?.data?.message)
        })
    }

    const setHomePosition = (options) => {
        CameraConfigAPI.put(
            {
                ...props,
                options: { ...options }
            },
            {
                action: "setHomePosition"
            }
        ).then(response => {
            if (response.status === 200) {
                // openNotificationWithIcon("success", "Thông báo", "Lưu vị trí thành công")
            } else {
                // openNotificationWithIcon("error", "Thông báo", response.message)
            }
        }).catch((err) => {
            // openNotificationWithIcon("error", "Thông báo", err.response?.data?.message)
        })
    }
    const onChange = (type, e) => {
        const copy = { ...currentCoord }
        copy[type] = e
        setCurrentCoord(copy)
    };


    useEffect(() => {
        getStatus({})
    }, [])

    return (
        <View style={{
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 'white',
            height: screenHeight,
        }}>
            {/* <Text>video ptz</Text> */}

            <VideoViewLivestream page="No" roomName={route.params.current} />

            <View style={{

            }}>

                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0, 0, 0, 0.2
                        )}
                    >
                        <Image source={logoZoomIn} style={styles.iconZoomIn} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => setHomePosition({})}
                    >
                        <Image source={logoSave} style={styles.iconSave} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0, 0, 0, -0.2
                        )}
                    >
                        <Image source={logoZoomOut} style={styles.iconZoomOut} />
                    </TouchableOpacity>
                </View>

                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            -0.2, 0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage1} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0, 0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage2} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0.2, 0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage3} />
                    </TouchableOpacity>
                </View>



                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            -0.2, 0, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage4} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => gotoHomePosition({})}
                    >
                        <Image source={logoReset} style={styles.iconImage5} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0.2, 0, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage6} />
                    </TouchableOpacity>
                </View>



                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            -0.2, -0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage7} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0, -0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage8} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                        onPress={() => relativeMove(
                            0.2, -0.2, 0, 0
                        )}
                    >
                        <Image source={logo} style={styles.iconImage9} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}