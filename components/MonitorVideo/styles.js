import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    monitorVideoContainer: {
        margin: 5
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },

    videoBlock: {
        backgroundColor: '#D0D5DD',
        marginBottom: 35,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    },

    bottomLine: {
        marginTop: 20,
        borderBottomColor: 'red',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderWidth: 2,
    },

    buildingAndFloorLeft: { paddingLeft: 10, paddingTop: 5 },

    cameraNameLeft: { paddingLeft: 10, paddingTop: 5, marginBottom: 5 },

    titleBuildingAndFloor: {
        fontWeight: 'bold',
    }


});