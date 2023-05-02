import {Dimensions, FlatList, Text, View} from "react-native";
import '../../styles/appStyles';
import dataNotifications from "../../utils/dummyData/notifications.json";
import {useEffect, useState} from "react";
import {styles} from "./styles";

export default function Notifications({navigation}) {

    const [notificationsList, setNotificationsList] = useState([]);
    const FlatListItem = (item, index) => {
        return <View style={styles.eachNotificationBlock}>
            <Text style={styles.notificationName}>{item.event_name}</Text>

            <Text>
                Thời gian: {item.created_at}
            </Text>

            <Text>
                Vị trí: {item.address}
            </Text>
        </View>
    }


    useEffect(() => {
        setNotificationsList(dataNotifications);
    }, [])


    return (
        <View style={styles.notificationContainer}>
            <FlatList
                style={styles.notificationFlatList}
                data={notificationsList}
                renderItem={({item, index}) => {
                    return (FlatListItem(item, index));
                }}
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>
        </View>

    );
}