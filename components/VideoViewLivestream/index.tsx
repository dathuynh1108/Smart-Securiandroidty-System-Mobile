import React from 'react';
import { Text } from "react-native";
import { View } from "react-native";
import {Client} from "../../package/ion"
import {IonSFUJSONRPCSignal}  from "../../package/ion/signal/json-rpc-impl"
import {v4 as uuidv4} from 'uuid';
export interface Props {
    roomName: string;
}
const VideoViewLivestream:React.FC<Props> = (props) => {
    return (
        <View>
            <Text>URL: Hello </Text>
        </View>
    );
}

export default VideoViewLivestream;