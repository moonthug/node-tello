import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { CommanderEvent } from './enums/CommanderEvent';
import { ReadCommand } from './enums/ReadCommand';
import { SetCommand } from './enums/SetCommand';
import { ControlCommand } from './enums/ControlCommand';
import { Command } from './types/Command';

/**
 *
 */
export interface ICommanderOptions {
  remoteAddress: string;
  remotePort: number;
  localAddress?: string;
  localPort?: number;
}




/**
 * 
 */
export class Commander extends EventEmitter {
  /**
   *
   */
  private readonly _socket: Socket;
  private readonly _localAddress: string;
  private readonly _localPort: number;
  private readonly _remoteAddress: string;
  private readonly _remotePort: number;

  private _initialised: boolean;
  private _socketBound: boolean;

  /**
   *
   */
  constructor (options: ICommanderOptions) {
    super();

    const defaults = {
      localAddress: '0.0.0.0',
      localPort: 8889,
      remoteAddress: '127.0.0.1',
      remotePort: 8889
    };

    const localOptions = {
      ...defaults,
      ...options
    };

    this._localAddress = localOptions.localAddress;
    this._localPort = localOptions.localPort;
    this._remoteAddress = localOptions.remoteAddress;
    this._remotePort = localOptions.remotePort;

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
   * @param command
   * @param params
   */
  async control(command: ControlCommand, params?: Array<string | number>) {
    return this._sendCommand(command, params);
  }

  /**
   *
   * @param command
   * @param params
   */
  async set(command: SetCommand, params?: Array<string | number>) {
    return this._sendCommand(command, params);
  }

  /**
   *
   * @param command
   * @param params
   */
  async read(command: ReadCommand, params?: Array<string | number>) {
    return this._sendCommand(command, params, true);
  }

  /**
   *
   * @param command
   * @param params
   * @param readCommand
   */
  private async _sendCommand(command: Command, params?: Array<string | number>, readCommand: boolean = false) {
    if (this._initialised === false) {
      throw new Error('Not initialised!');
    }

    const commandString = command + (readCommand === true ? '?' : '');

    return new Promise((resolve, reject) => {
      // @TODO: Add queue
      this._socket.send(commandString, this._remotePort, this._remoteAddress, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  /**
   *
   * @private
   */
  private _bindSocket(): void {
    this._socket.on('error', (err) => {
      this.emit(CommanderEvent.error, err);
      this._socket.close();
    });

    this._socket.on('close', () => {
      this._socket.close();
    });

    this._socket.on('message', (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
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
  get remoteAddress(): string { return this._remoteAddress; }
  get remotePort(): number { return this._remotePort; }
  get initialised(): boolean { return this._initialised; }
}
