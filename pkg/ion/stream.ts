import { Transport } from './client';
import { 
  RTCIceCandidate, 
  RTCPeerConnection, 
  RTCSessionDescription, 
  RTCView, 
  ScreenCapturePickerView, 
  RTCRtpTransceiver, 
  RTCRtpReceiver, 
  RTCRtpSender, 
  RTCErrorEvent, 
  MediaStream, 
  MediaStreamTrack, 
  mediaDevices, 
  permissions, 
} from 'react-native-webrtc';

export type Layer = 'low' | 'medium' | 'high';

export interface Encoding {
  layer: Layer;
  maxBitrate: number;
  maxFramerate: number;
}

export interface RemoteStream extends MediaStream {
  api: RTCDataChannel;
  audio: boolean;
  video: 'none' | Layer;
  framerate: Layer;
  _videoPreMute: 'none' | Layer;

  preferLayer(layer: 'none' | Layer): void;
  preferFramerate(layer: Layer): void;
  mute(kind: 'audio' | 'video'): void;
  unmute(kind: 'audio' | 'video'): void;
}

export function makeRemote(stream: MediaStream, transport: Transport): RemoteStream {
  const remote = stream as RemoteStream;
  remote.audio = true;
  remote.video = 'none';
  remote.framerate = 'high';
  remote._videoPreMute = 'high';

  const select = () => {
    const call = {
      streamId: remote.id,
      video: remote.video,
      audio: remote.audio,
      framerate: remote.framerate,
    };

    if (transport.api) {
      if (transport.api.readyState !== 'open') {
        // queue call if we aren't open yet
        transport.api.onopen = () => transport.api?.send(JSON.stringify(call));
      } else {
        transport.api.send(JSON.stringify(call));
      }
    }
  };

  remote.preferLayer = (layer: 'none' | Layer) => {
    remote.video = layer;
    select();
  };

  remote.preferFramerate = (layer: Layer) => {
    remote.framerate = layer;
    select();
  };

  remote.mute = (kind: 'audio' | 'video') => {
    if (kind === 'audio') {
      remote.audio = false;
    } else if (kind === 'video') {
      remote._videoPreMute = remote.video;
      remote.video = 'none';
    }
    select();
  };

  remote.unmute = (kind: 'audio' | 'video') => {
    if (kind === 'audio') {
      remote.audio = true;
    } else if (kind === 'video') {
      remote.video = remote._videoPreMute;
    }
    select();
  };

  return remote;
}
