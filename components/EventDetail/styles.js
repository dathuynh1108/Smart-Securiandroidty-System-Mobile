import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    eventDetailBlock: {
        display: 'flex',
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },

    eventDetailLeft: {
        width: '30%',
        // backgroundColor: '#D0D5DD',
        marginLeft: 10,
        fontWeight: "bold",
    },

    eventDetailRight: {
        width: '70%',
        // backgroundColor: 'yellow'
    },

    editResponseButton: {
        width: '100%',
        marginBottom: -20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginTop: 10,
        paddingRight: 10,

    },

    trueAlarmArea: {
        flexDirection: 'row', alignItems: 'center'
    },

    trueAlarmText: {
        width: 40
    },

    commentInputArea: {
        marginLeft: 7,
        // backgroundColor: 'yellow'
        backgroundColor: "white",
        marginBottom: 30,
        height: 80,
        width: '100%',
    },

    commentConfirmCancelButton: {
        display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 30
    },

    commentConfirm: {
        width: 100,
        backgroundColor: "#87cefa",
        marginRight: 10
    },

    commentCancel: {
        width: 60
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 300,
        height: 300,
    },


    confirmStatusBlock: {
        display: 'flex', flexDirection: "row", justifyContent: "space-evenly", marginTop: 20,
    },

    confirmStatusText: {
        width: '30%',
        marginLeft: 10,
        fontWeight: "bold",
    },

    confirmStatusResult: {
        width: '50%',
    },

    confirmStatusButton: {
        width: '20%',
        backgroundColor: "#2196F3",
        textAlign: "center",
        alignItems: "center",
        height: 25,
        borderRadius: 4,
        marginRight: 5,
        textAlignVertical: "center"
    },

    confirmStatusDoneButton: {
        width: '20%',
        // backgroundColor: "#2196F3",
        textAlign: "center",
        alignItems: "center",
        height: 25,
        borderRadius: 4,
        marginRight: 5,
        textAlignVertical: "center"
    },

    confirmStatusButtonText: {
        color: '#fff',
        fontWeight: "bold",
        textAlignVertical: "center",
        height: 25,
        textTransform: "uppercase",
    },

    imageViewBlock: {
        backgroundColor: "white",
        width: 300,
        height: 300,
        marginLeft: 50,
        marginTop: 10
    },


});