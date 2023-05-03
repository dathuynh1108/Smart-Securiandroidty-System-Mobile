import { Trickle } from '../client';
export { Trickle };

import {RTCSessionDescriptionInit} from "react-native-webrtc/lib/typescript/RTCSessionDescription"

export interface Signal {
  onnegotiate?: (jsep: RTCSessionDescriptionInit) => void;
  ontrickle?: (trickle: Trickle) => void;

  join(sid: string, uid: null | string, offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit>;
  offer(offer: RTCSessionDescriptionInit | undefined): Promise<RTCSessionDescriptionInit>;
  answer(answer: RTCSessionDescriptionInit | undefined): void;
  trickle(trickle: Trickle): void;
  close(): void;
}
