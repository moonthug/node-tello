import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { CadetEventEnum } from './enums/CadetEvent';
import { createStateFromString } from './State';

/**
 *
 */
export interface ICadetOptions {
  localAddress?: string;
  localPort?: number;
}

/**
 * 
 */
export class Cadet extends EventEmitter {
  /**
   *
   */
  private readonly _socket: Socket;
  private readonly _localAddress: string;
  private readonly _localPort: number;

  private _initialised: boolean;
  private _socketBound: boolean;

  /**
   *
   */
  constructor (options: ICadetOptions) {
    super();

    const defaults = {
      localAddress: '0.0.0.0',
      localPort: 8890
    };

    const localOptions = {
      ...defaults,
      ...options
    };

    this._localAddress = localOptions.localAddress;
    this._localPort = localOptions.localPort;

    this._initialised = false;
    this._socketBound = false;

    this._socket = createSocket('udp4');
  }

  /**
   *
   */
  initialise() {
    this._bindSocket();
    this._initialised = true;
  }

  /**
   *
   * @private
   */
  private _bindSocket(): void {
    this._socket.on('error', (err) => {
      this.emit(CadetEventEnum.error, err);
      this._socket.close();
    });

    this._socket.on('close', () => {
      this._socket.close();
    });

    this._socket.on('message', (msg, rinfo) => {
      this.emit(CadetEventEnum.state, createStateFromString(msg.toString('utf-8')));
    });

    this._socket.on('listening', () => {
      const address = this._socket.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });

    this._socket.bind(this._localPort, this._localAddress);
    this._socketBound = true;
  }

  /**
   *
   */
  get localAddress(): string { return this._localAddress; }
  get localPort(): number { return this._localPort; }
  get initialised(): boolean { return this._initialised; }
}
