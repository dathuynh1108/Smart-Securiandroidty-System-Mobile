// import * as React from "react";
// import { View, StyleSheet, Button } from "react-native";
// import Video from "react-native-video";
// const VideoView = ({ video_url }) => {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   return (
//     <View style={styles.container}>
//       <Video
//         source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }} // Can be a URL or a local file.
//         ref={video} // Store reference
//         // onBuffer={this.onBuffer}                // Callback when remote video is buffering
//         // onError={this.videoError}               // Callback when video cannot be loaded
//         style={styles.video}
//       />
//     </View>
//   );
// };

// export default VideoView;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // justifyContent: 'center',
//     // backgroundColor: '#ecf0f1',
//   },
//   video: {
//     alignSelf: "center",
//     width: "100%",
//     height: 200,
//   },
// });



import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export default function VideoView() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
