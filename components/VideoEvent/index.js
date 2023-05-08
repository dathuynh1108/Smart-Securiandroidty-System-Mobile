import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import Video from "react-native-video";
const VideoEvent = ({ video_url }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View style={styles.container}>
            <Video
                source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }} // Can be a URL or a local file.
                ref={video} // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.video}
            />
        </View>
    );
};

export default VideoEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: "center",
        width: "100%",
        height: 200,
    },
});
