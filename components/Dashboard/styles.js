import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    threeNumberBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'yellow',
    },

    eachBlock: {
        width: 125,
        height: 100,
        // backgroundColor: 'red',
        backgroundColor: '#D0D5DD',
        borderRadius: 10,
    },

    eachBlockEvent: {
        width: 130,
        height: 100,
        // backgroundColor: 'green',
        backgroundColor: '#D0D5DD',
        borderRadius: 10,
        flexShrink: 1
    },


    numberOfEachBlock: {
        fontSize: 34,
        fontWeight: 'bold',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
        textAlign: 'center'
    },

    textOfEachBlock: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
        textAlign: 'center'
    },

    pieChartContainer: {
        // backgroundColor: 'blue',
        backgroundColor: '#D0D5DD',
        borderRadius: 10,
        marginTop: 10,
    },

    recentEventsContainer: {
        // backgroundColor: 'purple',
        backgroundColor: '#D0D5DD',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column'
    },

    recentEventBlock: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row'
    },

    recentEventInfoRight: {
        backgroundColor: '#E4E7EC',
        borderRadius: 10,
        width: '60%',
        paddingLeft: 5
    },

    recentEventText: {
        color: '#0B4A6F',
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
    },

    eventName: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 10
    },

    eventZone: {

    },

    eventTime: {
        backgroundColor: "#CCE0FF",
        width: 200,
        borderColor: "#7875FF",
        borderRadius: 3,
        borderWidth: 2,
        paddingLeft: 5,
        fontSize: 12
    },

    eventAddress: {

    },

    eventDevice: {

    },

    chartConfig: {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 21,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }
});