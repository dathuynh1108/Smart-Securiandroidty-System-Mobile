import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    appContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },

    loginContainer: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 260,
        height: '100%',
        width: '100%'
    },

    logo: {
        width: 150,
        height: 150,
        marginBottom: 20
    },

    titleContainer: {
        width: '80%',
        height: 90,
        // backgroundColor: 'red',
        alignItems: 'center'
    },

    titleText: {
        fontWeight: 'bold',
        fontSize: 40
    },

    usernameContainer: {
        // backgroundColor: "yellow",
        backgroundColor: "#D0D5DD",
        borderRadius: 10,
        width: "90%",
        height: 45,
        marginBottom: 20,
        // alignItems: "center",
    },

    userNameInput: {
        // height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 15,
    },

    passwordContainer: {
        // backgroundColor: "yellow",
        backgroundColor: "#D0D5DD",
        borderRadius: 10,
        width: "90%",
        height: 45,
        marginBottom: 20,
        flexDirection: 'row'
    },

    passwordText: {
        // height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 15,
    },

    displayPasswordIcon: {
        paddingTop: 10,
        paddingRight: 10
    },

    forgetPasswordContainer: {
        marginBottom: 50,
        width: '90%',
        height: 30,
        alignItems: 'flex-end',
    },

    forgetPasswordText: {
        height: 30,
        // marginBottom: 50,
    },

    loginButton: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: 'red'
    },


    loginView: {
        width: '40%',
        height: 50,
        // backgroundColor: 'blue',
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        // marginTop: 100,
        borderRadius: 10
    },

    loginText: {
        fontWeight: "bold",
        color: "white",
    }
});