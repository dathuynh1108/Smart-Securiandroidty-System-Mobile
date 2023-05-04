import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    videoTag: {
        height: screenHeight / 2,
    },
    videoContainerConnect: {
    }
});