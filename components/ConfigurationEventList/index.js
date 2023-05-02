import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useEffect, useState } from "react";
import { styles } from "./styles";
import ImageModal from "react-native-image-modal";

export default function ConfigurationEventList({ navigation, eventTypeConfigList }) {

    const [data, setData] = useState([]);
    const FlatListItem = (item, index) => {
        let url = item.image_url
        return <TouchableOpacity >
            <View style={styles.itemBlock}>
                <Text style={styles.itemFirst}>{item.id}</Text>
                <Text style={styles.itemSecond}>{item.event_name}</Text>
                <Text style={styles.itemSecond}>{item.description}</Text>
                {/* <TouchableOpacity>
                    <ImageModal
                        resizeMode="contain"
                        style={{ width: 70, height: '97%', }}
                        source={{ uri: url, }}
                    />
                </TouchableOpacity> */}
            </View>
        </TouchableOpacity>
    }
    const FlatListHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerFirst}>Thứ tự</Text>
                <Text style={styles.headerSecond}>Tên sự kiện</Text>
                <Text style={styles.headerThird}>Mô tả</Text>
            </View>
        )
    }

    useEffect(() => {
        setData(eventTypeConfigList)
    }, [eventTypeConfigList])


    return (
        <View style={styles.iotListContainer}>
            <FlatList
                style={styles.flatListStyle}
                data={data}
                renderItem={({ item, index }) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={FlatListHeader}
            >
            </FlatList>

        </View>
    );
}