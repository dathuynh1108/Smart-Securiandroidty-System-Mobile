import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cameraConfigDetailBlock: {
        display: 'flex',
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },

    cameraConfigDetailLeft: {
        width: '30%',
        // backgroundColor: 'red',
        marginLeft: 10,
        fontWeight: "bold",
    },

    cameraConfigDetailRight: {
        width: '70%',
        // backgroundColor: 'yellow'
    },

    editResponseButton: {
        width: 50,
        marginBottom: -20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 10
    },

    trueAlarmArea: {
        flexDirection: 'row', alignItems: 'center'
    },

    trueAlarmText: {
        width: 40
    },

    commentInputArea: {
        marginLeft: 7,
        backgroundColor: 'yellow'
    },

    commentConfirmCancelButton: {
        display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'
    },

    commentConfirm: {
        width: 100
    },

    commentCancel: {
        width: 60
    }
});