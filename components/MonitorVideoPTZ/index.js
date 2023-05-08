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



const screenHeight = Dimensions.get("window").height;

export default function MonitorVideoPTZ({ route, navigation }) {
    console.log("video ptz: ", route.params)
    useEffect(() => {

    }, [])


    return (
        <View style={{
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 'white',
            height: screenHeight,
        }}>
            {/* <Text>video ptz</Text> */}

            <VideoViewLivestream roomName={route.params.current} />

            <View style={{

            }}>

                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logoZoomIn} style={styles.iconZoomIn} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logoSave} style={styles.iconSave} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logoZoomOut} style={styles.iconZoomOut} />
                    </TouchableOpacity>
                </View>

                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage1} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage2} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage3} />
                    </TouchableOpacity>
                </View>



                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage4} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logoReset} style={styles.iconImage5} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage6} />
                    </TouchableOpacity>
                </View>



                <View style={styles.oneRow}>
                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage7} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage8} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.oneRow}
                    >
                        <Image source={logo} style={styles.iconImage9} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}