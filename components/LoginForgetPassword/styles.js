import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    forgetPasswordContainer: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 230,
        height: '100%',
        width: '100%'
    },

    logo: {
        width: 150,
        height: 150,
        marginBottom: 20
    },

    recoverPassContainer: {
        width: '80%',
        height: 90,
        // backgroundColor: 'red',
        alignItems: 'center'
    },

    recoverPassText: {
        fontWeight: 'bold',
        fontSize: 30
    },

    emailInputContainer: {
        // backgroundColor: "yellow",
        backgroundColor: "#D0D5DD",
        borderRadius: 10,
        width: "90%",
        height: 45,
        marginBottom: 10,
        // alignItems: "center",
    },

    emailInputText: {
        // height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 15,
    },

    noteContainer: {
        // marginBottom: 10,
        width: '90%',
        height: 30,
        alignItems: 'flex-start',
    },

    noteText: {
        height: 50,
        // marginBottom: 50,
        fontSize: 13,
        width: '100%',
    },

    directionText: {
        fontWeight: 'bold',
    },

    sendLinkButton: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
    },

    sendLinkView: {
        width: 150,
        height: 50,
        // backgroundColor: 'blue',
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
        borderRadius: 10
    },

    sendLinkText: {
        fontWeight: "bold",
        color: "white",
    }
});