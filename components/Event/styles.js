import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    eventContainer: {
        height: "100%",
        // marginLeft: 15,
        // marginRight: 15,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        flex: 1,
    },

    itemBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 40,
    },

    itemFirst: {
        width: '50%',
        // backgroundColor: 'red',
        backgroundColor: '#D0D5DD',
        paddingLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        // textAlign: "center",
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 55 // as same as height
            },
            android: {}
        })
    },
    itemSecond: {
        width: '13%',
        backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 55 // as same as height
            },
            android: {}
        })
    },
    itemThird: {
        width: '37%',
        backgroundColor: '#D0D5DD',
        textAlignVertical: "center",
        ...Platform.select({
            ios: {
                lineHeight: 55 // as same as height
            },
            android: {}
        }),
        paddingRight: 4,
        paddingTop: 10
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-around'
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },

    headerFirst: { width: '50%', fontWeight: "bold" },
    headerSecond: { width: '13%', fontWeight: "bold" },
    headerThird: { width: '37%', fontWeight: "bold", alignItems: "flex-end", textAlign: "right" },

    flatListStyle: {
        flexGrow: 0,
        height: '75%',
        marginTop: 10
    },

    startDateContainer: { display: 'flex', flexDirection: 'row' },

    startDate: {
        width: 120, height: 50,
        // backgroundColor: '#D0D5DD',
        borderRadius: 5,
        paddingTop: 15,
        paddingLeft: 5,
    },

    startDateInput: {
        marginLeft: 10,
        width: 150,
    },

    startDateLib: { marginLeft: 10 },

    endDateContainer: { display: 'flex', flexDirection: 'row' },

    endDate: {
        width: 120, height: 50,
        // backgroundColor: '#D0D5DD',
        borderRadius: 5,
        paddingTop: 15,
        paddingLeft: 5,
    },

    endDateInput: {
        marginLeft: 10,
        width: 150,

    },

    endDateLib: { marginLeft: 10 },

    searchButtonView: {
        width: 100,
        borderRadius: 10
    },

    searchButton: {
        backgroundColor: "red",
        borderRadius: 10
    },

    resetButtonView: {
        width: 100,
    },

    containerSearchAndButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        marginBottom: 10,
    },

    resetTouchable: {
        width: 100,
        height: 40,
        // backgroundColor: "red",
        backgroundColor: "#ffe4c4",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginRight: 10
    },

    searchTouchable: {
        width: 100,
        height: 40,
        // backgroundColor: "red",
        backgroundColor: "#87cefa",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginRight: 10
    },


});