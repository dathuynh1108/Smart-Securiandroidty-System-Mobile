import { Platform, Text, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Button, Divider, Provider } from 'react-native-paper';
import { useEffect, useState } from "react";
import ConfigurationCameraList from "../ConfigurationCameraList";
import ConfigurationIOTList from "../ConfigurationIOTList";
import ConfigurationUserList from "../ConfigurationUserList";
import dataCameraDevicesConfig from '../../utils/dummyData/managementCameraDeviceConfig.json';
import dataIOTDevicesConfig from '../../utils/dummyData/managementIOTDeviceConfig.json';
import dataConfigurationCameraTypes from '../../utils/dummyData/configurationCameraType.json';
import dataConfigurationIotTypes from '../../utils/dummyData/configurationIOTDeviceType.json';
import dataConfigurationEventTypes from '../../utils/dummyData/configurationEventType.json';
import { styles } from "./styles";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import ConfigurationCameraTypeList from "../ConfigurationCameraTypeList";
import ConfigurationIOTTypeList from "../ConfigurationIOTTypeList";
import ConfigurationEventList from "../ConfigurationEventList";


export default function Configuration({ navigation }) {
    const [visible, setVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('camera');
    const [selectedMenuText, setSelectedMenuText] = useState('Camera');
    const [cameraConfigList, setCameraConfigList] = useState([]);
    const [iotConfigList, setIotConfigList] = useState([]);
    const [cameraTypeConfigList, setCameraTypeConfigList] = useState([]);
    const [iotTypeConfigList, setIotTypeConfigList] = useState([]);
    const [eventTypeConfigList, setEventTypeConfigList] = useState([]);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const handleSelectMenu = (type) => {
        switch (type) {
            case "camera":
                console.log("select camera");
                setSelectedMenu('camera');
                setSelectedMenuText('Camera');
                break;

            case "camera_type":
                console.log("select camera_type");
                setSelectedMenu('camera_type');
                setSelectedMenuText('Loại camera');
                break;

            case "iot":
                console.log("select iot");
                setSelectedMenu('iot');
                setSelectedMenuText('Cảm biến');
                break;

            case "iot_type":
                console.log("select iot type");
                setSelectedMenu('iot_type');
                setSelectedMenuText('Loại cảm biến');
                break;

            case "event":
                console.log("select event");
                setSelectedMenu('event');
                setSelectedMenuText('Sự kiện');
                break;


            case "user":
                console.log("select user");
                setSelectedMenuText('Người dùng');
                break;
        }

        hideMenu();
    }
    // const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);


    useEffect(() => {
        setCameraConfigList(dataCameraDevicesConfig);
        setIotConfigList(dataIOTDevicesConfig);
        setCameraTypeConfigList(dataConfigurationCameraTypes);
        setIotTypeConfigList(dataConfigurationIotTypes);
        setEventTypeConfigList(dataConfigurationEventTypes);
        setSelectedMenu('camera');
    }, [])


    return (
        <Provider style={{}}>
            <View style={[styles.menuContainer]}>
                {/* <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Chọn cấu hình: {selectedMenuText}</Button>}>
                    <Menu.Item onPress={() => handleSelectMenu('camera')} title="Camera"/>
                    <Menu.Item onPress={() => handleSelectMenu('iot')} title="Thiết bị cảm biến"/>
                </Menu> */}

                <Menu
                    visible={visible}
                    anchor={<Text style={{ color: "red" }} onPress={showMenu}>Chọn: {selectedMenuText}</Text>}
                    onRequestClose={hideMenu}
                >
                    <MenuItem onPress={() => handleSelectMenu('camera')}>Camera</MenuItem>
                    <MenuItem onPress={() => handleSelectMenu('camera_type')}>Loại camera</MenuItem>
                    <MenuItem onPress={() => handleSelectMenu('iot')}>Cảm biến</MenuItem>
                    <MenuItem onPress={() => handleSelectMenu('iot_type')}>Loại cảm biến</MenuItem>
                    <MenuItem onPress={() => handleSelectMenu('event')}>Sự kiện</MenuItem>
                    {/* <MenuItem onPress={() => handleSelectMenu('user')}>Người dùng</MenuItem> */}
                </Menu>
            </View>


            {selectedMenu == 'camera' ? <ConfigurationCameraList navigation={navigation} camerasList={cameraConfigList} /> : ''}
            {selectedMenu == 'camera_type' ? <ConfigurationCameraTypeList navigation={navigation} cameraTypeConfigList={cameraTypeConfigList} /> : ''}
            {selectedMenu == 'iot' ? <ConfigurationIOTList navigation={navigation} iotList={iotConfigList} /> : ''}
            {selectedMenu == 'iot_type' ? <ConfigurationIOTTypeList navigation={navigation} iotTypeConfigList={iotTypeConfigList} /> : ''}
            {selectedMenu == 'event' ? <ConfigurationEventList navigation={navigation} eventTypeConfigList={eventTypeConfigList} /> : ''}
            {/* {selectedMenu == 'user' ? <ConfigurationUserList navigation={navigation}  /> : ''} */}

        </Provider>
    );
}