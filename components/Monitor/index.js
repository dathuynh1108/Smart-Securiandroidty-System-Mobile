import {useEffect, useState} from "react";
import {Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"
import MapView, {Callout, Circle, LocalTile, Marker, Overlay, UrlTile} from "react-native-maps"
import dataEvents from '../../utils/dummyData/eventList.json';
import dataIOTDevicesConfig from '../../utils/dummyData/managementIOTDeviceConfig.json';
import dataCameraDevices from '../../utils/dummyData/managementCameraDevice.json';
import dataIOTDevices from '../../utils/dummyData/managementIOTDevice.json';
import dataBuildings from '../../utils/dummyData/managementBuilding.json';
import dataFloors from '../../utils/dummyData/managementFloor.json';
import treeselectData from '../../utils/dummyData/treeData.json';
import {generateDropdownTreeSelectMap} from "../../utils/helper/helper";
import TreeSelect from 'react-native-tree-select';
import mapImage from '../../assets/imageTest/floor2_B.png'
import mapImage1 from '../../assets/imageTest/buildingA.png'
import mapImage2 from '../../assets/imageTest/floor4_A.png'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const OverlayComponent = () => {
    return (
        <View style={{}}>
            <ImageBackground style={{
                width: screenWidth * 100 / 100,
                height: screenHeight * 60 / 100,
                display: 'flex',
                resizeMode: 'contain',
            }}
                             source={mapImage1}
                             scale={0.5}
            />

        </View>
    )
}


export default function Monitor({navigation}) {
    const [dataTree, setDataTree] = useState([]);
    const [result, setResult] = useState('');
    const [pin, setPin] = useState({
        // latitude: 37.78825,
        // longitude: -122.4324
        latitude: 10.762622,
        longitude: 106.660172
    })
    const [region, setRegion] = useState({
        // latitude: 37.78825,
        // longitude: -122.4324,
        latitude: 10.76,
        longitude: 106.66,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    const _onClick = ({item, routes, currentNode}) => {
        // console.log("item: ", item.type)
        // console.log("current node: ", currentNode)
        console.log(item.name, currentNode);
        console.log(routes);
        setResult(item.name);
    }
    const _onClickLeaf = ({item, routes, currentNode}) => {
        console.log(item.name, currentNode);
        console.log(routes);
    };


    useEffect(() => {
        let combineData = generateDropdownTreeSelectMap(dataBuildings, dataFloors, dataCameraDevices, dataIOTDevices);
        setDataTree(combineData["_j"]);
    }, [])


    return (
        <View style={{marginTop: 10, flex: 1}}>
            <Text>{result}</Text>

            {/*<View style={{*/}
            {/*    width: '100%',*/}
            {/*    height: screenHeight / 50,*/}
            {/*    // flex: 1,*/}
            {/*    // marginBottom: 20,*/}
            {/*    backgroundColor: 'red'*/}
            {/*}}>*/}
            {/*    <TreeSelect*/}
            {/*        // data={treeselectData}*/}
            {/*        data={dataTree}*/}
            {/*        isOpen={true}*/}
            {/*        // openIds={['A01']}*/}
            {/*        // defaultSelectedId={['B062']}*/}
            {/*        isShowTreeId={false}*/}
            {/*        // selectType="single"*/}
            {/*        selectType="single"*/}
            {/*        itemStyle={{*/}
            {/*            backgroudColor: 'white',*/}
            {/*            fontSize: 12,*/}
            {/*            color: '#995962'*/}
            {/*        }}*/}
            {/*        selectedItemStyle={{*/}
            {/*            backgroudColor: 'yellow',*/}
            {/*            fontSize: 16,*/}
            {/*            color: '#171e99'*/}
            {/*        }}*/}
            {/*        onClick={_onClick}*/}
            {/*        onClickLeaf={_onClickLeaf}*/}
            {/*        treeNodeStyle={{*/}
            {/*            openIcon: <Image*/}
            {/*                resizeMode="stretch"*/}
            {/*                style={{width: 18, height: 18}}*/}
            {/*                // source={{uri: 'https://freedesignfile.com/upload/2016/05/House-building-blueprint-design-vector-04.jpg'}}*/}
            {/*                source={mapImage}*/}
            {/*            />,*/}
            {/*            closeIcon: <Image*/}
            {/*                resizeMode="stretch"*/}
            {/*                style={{width: 18, height: 18}}*/}
            {/*                source={{uri: 'https://freedesignfile.com/upload/2016/05/House-building-blueprint-design-vector-04.jpg'}}*/}
            {/*            />,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}

            <View>
                {/*<MapView*/}
                {/*    style={styles.map}*/}
                {/*    initialRegion={{*/}
                {/*        // latitude: 37.78825,*/}
                {/*        // longitude: -122.4324,*/}
                {/*        latitude: 10.762622,*/}
                {/*        longitude: 106.660172,*/}
                {/*        latitudeDelta: 0.0922,*/}
                {/*        longitudeDelta: 0.0421*/}
                {/*    }}*/}
                {/*    provider="google"*/}
                {/*>*/}
                {/*    /!*<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />*!/*/}
                {/*    <Marker*/}
                {/*        coordinate={pin}*/}
                {/*        pinColor="black"*/}
                {/*        // draggable={true}*/}
                {/*        // onDragStart={(e) => {*/}
                {/*        //     console.log("Drag start", e.nativeEvent.coordinates)*/}
                {/*        // }}*/}
                {/*        // onDragEnd={(e) => {*/}
                {/*        //     setPin({*/}
                {/*        //         latitude: e.nativeEvent.coordinate.latitude,*/}
                {/*        //         longitude: e.nativeEvent.coordinate.longitude*/}
                {/*        //     })*/}
                {/*        // }}*/}
                {/*        title='marker ne'*/}
                {/*        description='description marker'*/}
                {/*    >*/}
                {/*        <Callout>*/}
                {/*            <Text>nhan v</Text>*/}
                {/*        </Callout>*/}
                {/*    </Marker>*/}
                {/*    /!*<Circle center={pin} radius={1000} />*!/*/}
                {/*</MapView>*/}


                <MapView
                    style={styles.map}
                    initialRegion={{
                        // latitude: 37.78825,
                        // longitude: -122.4324,
                        latitude: 10.762622,
                        longitude: 106.660172,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    // provider="google"
                >
                    {/*<Marker*/}
                    {/*    coordinate={pin}*/}
                    {/*    pinColor="black"*/}
                    {/*    title='marker ne'*/}
                    {/*    description='description marker'*/}
                    {/*>*/}
                    {/*    <Callout>*/}
                    {/*        <Text>nhan v</Text>*/}
                    {/*    </Callout>*/}
                    {/*</Marker>*/}

                    {/*<OverlayComponent />*/}
                    {/*<Marker*/}
                    {/*    coordinate={pin}*/}
                    {/*    pinColor="black"*/}
                    {/*    title='marker ne'*/}
                    {/*    description='description marker'*/}
                    {/*    style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}*/}
                    {/*>*/}
                    {/*    <Callout>*/}
                    {/*        <Text>nhan v</Text>*/}
                    {/*    </Callout>*/}
                    {/*</Marker>*/}


                    <Overlay bounds={[[10.762622, 106.660172], [10.765622, 106.663172]]} image={mapImage} />
                </MapView>

                {/*<View*/}
                {/*    pointerEvents="none"*/}
                {/*    style={{*/}
                {/*        position: 'absolute', top: 0, left: 0*/}
                {/*    }}>*/}
                {/*    <Image style={{*/}
                {/*        display: 'flex',*/}
                {/*        resizeMode: 'contain',*/}
                {/*        width: screenWidth,*/}
                {/*        height: screenHeight*/}
                {/*    }} source={mapImage1}/>*/}

                {/*</View>*/}

                {/*<View*/}
                {/*    pointerEvents="none"*/}
                {/*    style={{*/}
                {/*        position: 'absolute', top: 10.762622, left: 106.660172*/}
                {/*    }}>*/}
                {/*    <Image style={{*/}
                {/*        display: 'flex',*/}
                {/*        resizeMode: 'contain',*/}
                {/*        width: screenWidth * 20 / 100,*/}
                {/*        height: screenHeight * 20 / 100,*/}
                {/*    }} source={mapImage2}/>*/}

                {/*</View>*/}


                {/*<OverlayComponent/>*/}

            </View>


            {/*<GooglePlacesAutocomplete*/}
            {/*    placeholder="Search"*/}
            {/*    fetchDetails={true}*/}
            {/*    GooglePlacesSearchQuery={{*/}
            {/*        rankby: "distance"*/}
            {/*    }}*/}
            {/*    onPress={(data, details = null) => {*/}
            {/*        // 'details' is provided when fetchDetails = true*/}
            {/*        console.log(data, details)*/}
            {/*        setRegion({*/}
            {/*            latitude: details.geometry.location.lat,*/}
            {/*            longitude: details.geometry.location.lng,*/}
            {/*            latitudeDelta: 0.0922,*/}
            {/*            longitudeDelta: 0.0421*/}
            {/*        })*/}
            {/*    }}*/}
            {/*    query={{*/}
            {/*        key: "KEY",*/}
            {/*        language: "en",*/}
            {/*        components: "country:us",*/}
            {/*        types: "establishment",*/}
            {/*        radius: 30000,*/}
            {/*        location: `${region.latitude}, ${region.longitude}`*/}
            {/*    }}*/}
            {/*    styles={{*/}
            {/*        container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },*/}
            {/*        listView: { backgroundColor: "white" }*/}
            {/*    }}*/}
            {/*/>*/}


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 50,
        top: 50,
        left: 50,
        right: 50,
        backgroundColor: 'red',
    },
});