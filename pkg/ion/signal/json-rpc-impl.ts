import uuid from 'react-native-uuid';
import { Signal } from '.';
import { Trickle } from '../client';
import {RTCSessionDescriptionInit} from "react-native-webrtc/lib/typescript/RTCSessionDescription"
class IonSFUJSONRPCSignal implements Signal {
  protected socket: WebSocket;
  protected pingInterval: any;
  private _onopen?: () => void;
  private _onclose?: (ev: Event) => void;
  private _onerror?: (error: Event) => void;
  onnegotiate?: (jsep: RTCSessionDescriptionInit) => void;
  ontrickle?: (trickle: Trickle) => void;

  private _notifyhandlers: { [method: string]: (params: any) => void };

  constructor(uri: string) {
    this.socket = new WebSocket(uri);
    this._notifyhandlers = {};

    this.socket.addEventListener('open', () => {
      if (this._onopen) this._onopen();
      this.pingInterval = setInterval(() => this.notify('ping', ""), 5000)
    });

    this.socket.addEventListener('error', (e) => {
      if (this._onerror) this._onerror(e);
    });

    this.socket.addEventListener('close', (e) => {
      if (this._onclose) this._onclose(e);
    });

    this.socket.addEventListener('message', async (event) => {
      const resp = JSON.parse(event.data);
      if (resp.method === 'offer') {
        if (this.onnegotiate) this.onnegotiate(resp.params);
      } else if (resp.method === 'trickle') {
        if (this.ontrickle) this.ontrickle(resp.params);
      } else {
        const handler = this._notifyhandlers[resp.method];
        if (handler) {
          handler(resp.params);
        }
      }
    });
  }

  on_notify<T>(method: string, cb: (params: T) => void) {
    this._notifyhandlers[method] = cb;
  }

  // JsonRPC2 Call
  async call<T>(method: string, params: any): Promise<T> {
    const id = uuid.v4();
    this.socket.send(
      JSON.stringify({
        method,
        params,
        id,
      }),
    );

    return new Promise<T>((resolve, reject) => {
      const handler = (event: MessageEvent<any>) => {
        const resp = JSON.parse(event.data);
        if (resp.id === id) {
          if (resp.error) reject(resp.error);
          else resolve(resp.result);
          this.socket.removeEventListener('message', handler);
        }
      };
      this.socket.addEventListener('message', handler);
    });
  }

  // JsonRPC2 Notification
  notify(method: string, params: any) {
    this.socket.send(
      JSON.stringify({
        method,
        params,
      }),
    );
  }

  async join(sid: string, uid: string, offer: RTCSessionDescriptionInit) {
    return this.call<RTCSessionDescriptionInit>('join', { sid, uid, offer });
  }

  trickle(trickle: Trickle) {
    this.notify('trickle', trickle);
  }

  async offer(offer: RTCSessionDescriptionInit) {
    return this.call<RTCSessionDescriptionInit>('offer', { desc: offer });
  }

  answer(answer: RTCSessionDescriptionInit) {
    this.notify('answer', { desc: answer });
  }

  close() {
    if (this.pingInterval) clearInterval(this.pingInterval)
    this.socket.close();
  }

  set onopen(onopen: () => void) {
    if (this.socket.readyState === WebSocket.OPEN) {
      onopen();
    }
    this._onopen = onopen;
  }
  set onerror(onerror: (error: Event) => void) {
    this._onerror = onerror;
  }
  set onclose(onclose: (ev: Event) => void) {
    this._onclose = onclose;
  }
}

export { IonSFUJSONRPCSignal };
