import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    cameraListContainer: {
        // marginLeft: 10,
        // marginRight: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },

    itemBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 90,
        borderBottomColor: '#D0D5DD',
        borderBottomWidth: 1,
    },

    itemFirst: {
        width: '25%',
        // backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,
        // color: "#87cefa",
        fontWeight: "500"
    },
    itemSecond: {
        width: '45%',
        // backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        // textAlign: "right",
        textAlign: "left",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        })
    },
    itemThird: {
        width: '30%',
        // backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        textAlign: "right",
        paddingRight: 10,
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        })
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    headerFirst: { width: '30%', fontWeight: "bold", },
    headerSecond: { width: '40%', fontWeight: "bold", textAlign: "right" },
    headerThird: { width: '30%', fontWeight: "bold", textAlign: "right" },

    flatListStyle: {
        flexGrow: 0,
        height: '90%',
        marginTop: 10
    }
});