import {Platform, StyleSheet} from "react-native";

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
        height: 50,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },

    itemFirst: {
        width: '50%', backgroundColor: '#D0D5DD', textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,

    },
    itemSecond: {
        width: '20%', backgroundColor: '#D0D5DD', textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 45 // as same as height
            },
            android: {}
        }),
        paddingLeft: 10,
        textAlign: "right"

    },
    itemThird: {
        width: '30%', backgroundColor: '#D0D5DD', textAlignVertical: "center",
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

    headerFirst: {width: '50%',  fontWeight: "bold", },
    headerSecond: {width: '20%', fontWeight: "bold", textAlign: "right"},
    headerThird: {width: '30%',  fontWeight: "bold", textAlign: "right"},

    flatListStyle: {
        flexGrow: 0,
        height: '90%',
        marginTop: 10
    }
});