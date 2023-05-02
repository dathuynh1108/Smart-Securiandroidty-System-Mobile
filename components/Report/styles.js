import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    allEventsAndProcessedEvents: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    allEvents: {
        width: screenWidth / 2 - 20,
        height: 100,
        backgroundColor: '#0B4A6F',
        borderRadius: 10
    },

    allEventsText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: "#DDDDDD",
        paddingTop: 7,
    },

    allEventsNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 30,
        color: "#DDDDDD",
    },

    processedEvents: {
        width: screenWidth / 2 - 20,
        height: 100,
        backgroundColor: '#4A1FB8',
        borderRadius: 10
    },

    processedEventsText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: "#DDDDDD",
        paddingTop: 7,
    },

    processedEventsNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 30,
        color: "#DDDDDD",
    },

    trueAndFalseAlarm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    trueAlarm: {
        width: screenWidth / 2 - 20,
        height: 100,
        backgroundColor: '#8AC53E',
        borderRadius: 10
    },

    trueAlarmText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: "#DDDDDD",
        paddingTop: 7,
    },

    trueAlarmNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        color: "#DDDDDD",
        fontSize: 30
    },

    falseAlarm: {
        width: screenWidth / 2 - 20,
        height: 100,
        backgroundColor: '#D92D20',
        borderRadius: 10
    },

    falseAlarmText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: "#DDDDDD",
        paddingTop: 7,
    },

    falseAlarmNumber: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 30,
        color: "#DDDDDD",
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