import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { CommanderEvent } from './enums/CommanderEvent';
import { ReadCommand } from './enums/ReadCommand';
import { SetCommand } from './enums/SetCommand';
import { ControlCommand } from './enums/ControlCommand';
import { Command } from './types/Command';

export interface ICommanderOptions {
  address: string;
  port: number;
}

/**
 * 
 */
export class Commander extends EventEmitter {
  /**
   *
   */
  private readonly _socket: Socket;
  private readonly _address: string;
  private readonly _port: number;

  private _initialised: boolean;
  private _socketBound: boolean;

  /**
   *
   */
  constructor (options: ICommanderOptions) {
    super();
    this._address = options.address;
    this._port = options.port;

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
   */
  async control(command: ControlCommand) {
    return this._sendCommand(command);
  }

  /**
   *
   * @param command
   */
  async set(command: SetCommand) {
    return this._sendCommand(command);
  }

  /**
   *
   * @param command
   */
  async read(command: ReadCommand) {
    return this._sendCommand(command);
  }

  /**
   *
   * @param command
   */
  private async _sendCommand(command: Command) {
    if (this._initialised === false) {
      throw new Error('Not initialised!');
    }

    return new Promise((resolve, reject) => {
      // @TODO: Add queue
      this._socket.send(command, this._port, this._address, (err) => {
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

    this._socket.bind(this._port);
    this._socketBound = true;
  }

  /**
   *
   */
  get address(): string {
    return this._address;
  }

  /**
   *
   */
  get port(): number {
    return this._port;
  }

  /**
   *
   */
  get initialised(): boolean {
    return this._initialised;
  }
}
