import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    iotListContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },

    itemBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },

    itemFirst: {
        width: '20%',
        backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,
        fontWeight: 500
    },
    itemSecond: {
        width: '40%',
        backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,
        textAlign: "left"

    },
    itemThird: {
        width: '40%',
        backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,
        textAlign: "right",
        paddingRight: 10,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    headerFirst: { width: '20%', fontWeight: "bold", },
    headerSecond: { width: '40%', fontWeight: "bold", textAlign: "center" },
    headerThird: { width: '40%', fontWeight: "bold", textAlign: "center" },

    flatListStyle: {
        flexGrow: 0,
        height: '90%',
        marginTop: 10
    }
});