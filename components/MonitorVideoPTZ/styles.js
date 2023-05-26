import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    oneRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    iconImage: {
        width: 60,
        height: 60,
    },

    iconImage1: {
        width: 60,
        height: 60,
        transform: [{ rotate: '135deg' }],
    },
    iconImage2: {
        width: 60,
        height: 60,
        transform: [{ rotate: '180deg' }],
    },
    iconImage3: {
        width: 60,
        height: 60,
        transform: [{ rotate: '-135deg' }],
    },

    iconImage4: {
        width: 60,
        height: 60,
        transform: [{ rotate: '90deg' }],
    },
    iconImage5: {
        width: 50,
        height: 50,
        margin: 5
        // transform: [{ rotate: '-135deg' }],
    },
    iconImage6: {
        width: 60,
        height: 60,
        transform: [{ rotate: '-90deg' }],
    },


    iconImage7: {
        width: 60,
        height: 60,
        transform: [{ rotate: '45deg' }],
    },
    iconImage8: {
        width: 60,
        height: 60,
        transform: [{ rotate: '0deg' }],
    },
    iconImage9: {
        width: 60,
        height: 60,
        transform: [{ rotate: '-45deg' }],
    },


    iconZoomIn: {
        width: 60,
        height: 60,
    },

    iconZoomOut: {
        width: 60,
        height: 60,
    },


    iconSave: {
        width: 50,
        height: 50,
    }
});