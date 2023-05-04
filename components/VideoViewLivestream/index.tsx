import React, { useEffect, useRef, useState } from "react";
import { View, Text } from 'react-native'
import { Client } from "../../pkg/ion";
import { IonSFUJSONRPCSignal } from "../../pkg/ion/signal/json-rpc-impl";
import uuid from "react-native-uuid";
import { styles } from './styles'
import { sfuAddress } from "../../apis/configs/axiosConfig";
import { RTCView } from "react-native-webrtc";
const config = {
    sdpSemantics: 'unified-plan',
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
        {
            urls: "stun:stun.stunprotocol.org:3478",
        },
    ],
};

const VideoView = ({navigation}) => {
    const [remoteStream, setRemoteStream] = useState<any>(null);
    const client = useRef<any>(null);
    const signal = useRef<any>(null);
    const connecting = useRef<boolean>(false);
    const streams = useRef({});
    const [message, setMessage] = useState("Connecting to camera...")

    const roomName = useRef<string>("");
    useEffect(() => {
        console.log("Use effect", connecting.current)
        if (!connecting.current) {
            roomName.current = "rtsp://tris.ddns.net:5564/Streaming/Channels/102?transportmode=unicast&profile=Profile_2";
            connecting.current = true;
            signal.current = new IonSFUJSONRPCSignal(sfuAddress);
            client.current = new Client(signal.current, config);
            signal.current.onopen = () => client.current.join(roomName.current, uuid.v4());
            client.current.ontrack = (track, stream) => {
                console.log("got track:", track.id, "kind:", track.kind, "for stream:", stream.id);
                if (!streams.current[stream.id]) {
                    streams.current[stream.id] = stream;
                    console.log("Set remote stream:", stream.toURL())
                    setRemoteStream(stream);
                }
                track.onunmute = () => {
                    console.log("Track unmuted:", track.id, "kind:", track.kind)
                    if (track.kind === "audio") {
                    } else {
                        connecting.current = false;
                        setMessage("")
                    }
                };
            };
        }
        return () => {
            console.log("Closing video view!")
            if (client.current) {
                client.current.close();
                client.current = null;
                streams.current = {};
                roomName.current = "";
            }
        }
    }, []);

    return (
       <>
       {message ? <Text>{message}</Text> :""}
       {
        remoteStream &&
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.stream} />
      }
      </>
    );
}

  

export default React.memo(VideoView)