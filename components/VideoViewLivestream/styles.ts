import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    videoTag: {
        maxWidth: screenWidth,
        maxHeight: screenHeight,
        borderRadius: 7,
    },
    stream: {
        flex: 1
      },
    videoContainerConnect: {
    }
});