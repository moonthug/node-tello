import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { H264Decoder } from 'h264decoder';
// const Split = require('stream-split');

import { RGB2PPM, YUV2RBG } from './utils/colours';
import { EnsignEventEnum } from './enums/EnsignEvent';

// const NALSeparator = new Buffer([0, 0, 0, 1]);

/**
 *
 */
export interface IEnsignOptions {
  localAddress?: string;
  localPort?: number;
}

/**
 * 
 */
export class Ensign extends EventEmitter {
  /**
   *
   */
  private readonly _socket: Socket;
  private readonly _decoder: H264Decoder;
  private readonly _localAddress: string;
  private readonly _localPort: number;

  private _takeSnap: boolean;
  /**
   *
   */
  constructor (options: IEnsignOptions) {
    super();

    const defaults = {
      localAddress: '0.0.0.0',
      localPort: 11111
    };

    const localOptions = {
      ...defaults,
      ...options
    };

    // this._outStream = localOptions.outStream;
    this._localAddress = localOptions.localAddress;
    this._localPort = localOptions.localPort;

    this._takeSnap = false;

    this._decoder = new H264Decoder();
    this._socket = createSocket('udp4');
  }

  /**
   *
   */
  initialise() {
    this._bindSocket();
  }

  /**
   *
   */
  public snap() {
    this._takeSnap = true;
  }

  /**
   *
   * @param msg
   * @private
   */
  private _handleMessage (msg: Buffer) {
    if (this._takeSnap === true) {
      const ret = this._decoder.decode(msg);
      if (ret === H264Decoder.PIC_RDY) {
        const rgb = YUV2RBG(this._decoder.pic, this._decoder.width, this._decoder.height);
        const ppm = RGB2PPM(rgb, this._decoder.width, this._decoder.height);
        this.emit(EnsignEventEnum.snap, ppm);
        this._takeSnap = false;
      }
    }
  }

  /**
   *
   * @private
   */
  private _bindSocket(): void {
    this._socket.on('error', (err) => {
      // this.emit(CommanderEventEnum.error, err);
      this._socket.close();
    });

    this._socket.on('close', () => {
      this._socket.close();
    });

    this._socket.on('message', (msg: Buffer) => this._handleMessage(msg));

    this._socket.on('listening', () => {
      const address = this._socket.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });

    this._socket.bind(this._localPort, this._localAddress);
  }

  /**
   *
   */
  get localAddress(): string { return this._localAddress; }
  get localPort(): number { return this._localPort; }
}
