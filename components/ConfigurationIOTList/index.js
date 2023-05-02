import {FlatList, Platform, Text, TouchableOpacity, View} from "react-native";
import {MenuView} from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {useEffect, useState} from "react";
import {styles} from "./styles";


export default function ConfigurationIOTList ({navigation, iotList}) {

    // console.log("config iot list: ", camerasList);

    const [data, setData] = useState([]);
    const FlatListItem = (item, index) => {
        return <TouchableOpacity onPress={() => navigation.navigate('ConfigurationIOTDetail', item)}>
            <View style={styles.itemBlock}>
                <Text style={styles.itemFirst}>{item.name}</Text>
                <Text style={styles.itemSecond}>{item.zone}</Text>
                <Text style={styles.itemThird}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    }
    const FlatListHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerFirst}>Tên cảm biến</Text>
                <Text style={styles.headerSecond}>Zone</Text>
                <Text style={styles.headerThird}>Trạng thái</Text>
            </View>
        )
    }
    const mapperIOTsList = (iots) => {
        iots = iots.map((ele, key) => {
            let name = ele['name'];
            let zone = ele['zone'];
            let status = ele['status'] == 'free' ? 'Trống' : 'Đã sử dụng';
            return {...ele, name, zone, status}
        })
        setData(iots);
    }


    useEffect(() => {
        mapperIOTsList(iotList)
    }, [iotList])



    return (
        <View style={styles.iotListContainer}>
            <FlatList
                style={styles.flatListStyle}
                data={data}
                renderItem={({item, index}) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={FlatListHeader}
            >
            </FlatList>

        </View>
    );
}