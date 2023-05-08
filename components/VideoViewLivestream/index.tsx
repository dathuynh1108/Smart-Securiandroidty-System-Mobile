import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text } from 'react-native'
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
export interface Props {
    navigation: any;
    roomName: string;
}

const VideoView: React.FC<Props> = (props) => {
    const [remoteStream, setRemoteStream] = useState<any>(null);
    const client = useRef<any>(null);
    const signal = useRef<any>(null);
    const connecting = useRef<boolean>(false);
    const streams = useRef({});
    const [message, setMessage] = useState("Connecting to camera...")

    const roomName = useRef<string>("");
    useEffect(() => {
        roomName.current = props.roomName ? props.roomName : "rtsp://tris.ddns.net:5564/Streaming/Channels/102?transportmode=unicast&profile=Profile_2";
        const useEffectRoomName = roomName.current;
        if (client.current) {
            client.current.close();
            client.current = null;
        }   

        if (roomName.current && !connecting.current) {
            console.log("Connecting to SFU room:", roomName.current);
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
            if (client.current && roomName.current === useEffectRoomName) {
                console.log("Closing video view for room:", roomName.current);
                client.current.close();
                client.current = null;
                roomName.current = "";
                streams.current = {};

            }
        };
    }, [props.roomName]);

    return (
        <SafeAreaView>
            {message ? <Text>{message}</Text> : ""}
            {
                remoteStream &&
                <RTCView
                    objectFit={"contain"}
                    zOrder={20}
                    streamURL={remoteStream.toURL()}
                    style={styles.videoTag}
                />
            }
        </SafeAreaView>
    );
}



export default React.memo(VideoView)