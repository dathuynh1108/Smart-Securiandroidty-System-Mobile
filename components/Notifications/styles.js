import {Dimensions, StyleSheet} from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    eachNotificationBlock: {
        width: screenWidth,
        height: 70,
        // backgroundColor: 'yellow',
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },

    notificationName: {
        fontWeight: "bold",
        fontSize: 18
    },

    notificationContainer: {
        flex: 1,
        alignItems: "center",
        height: '100%',
        // width: '100%',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
    },

    notificationFlatList: {
        height: '100%'
    }
});