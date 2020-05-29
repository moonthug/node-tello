import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { Command } from './Command';
import { CommanderEventEnum } from './enums/CommanderEvent';
import { ReadCommandEnum } from './enums/ReadCommand';
import { SetCommandEnum } from './enums/SetCommand';
import { ControlCommandEnum } from './enums/ControlCommand';
import { CommandType } from './types/CommandType';

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
  constructor (options?: ICommanderOptions) {
    super();

    const defaults = {
      localAddress: '0.0.0.0',
      localPort: 8889,
      remoteAddress: '192.168.1.10',
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
    this._sendCommand(ControlCommandEnum.command);

    this._initialised = true;
  }

  /**
   *
   * @param command
   * @param params
   */
  async control(command: ControlCommandEnum, params?: Array<string | number>) {
    return this._sendCommand(command, params);
  }

  /**
   *
   * @param command
   * @param params
   */
  async set(command: SetCommandEnum, params?: Array<string | number>) {
    return this._sendCommand(command, params);
  }

  /**
   *
   * @param command
   * @param params
   */
  async read(command: ReadCommandEnum, params?: Array<string | number>) {
    return this._sendCommand(command, params, true);
  }

  /**
   *
   * @param commandType
   * @param params
   * @param readCommand
   */
  private async _sendCommand(commandType: CommandType, params?: Array<string | number>, readCommand: boolean = false) {
    const command = new Command(commandType, params, readCommand);

      return new Promise((resolve, reject) => {
        // @TODO: Add queue
      this._socket.send(command.toString(), this._remotePort, this._remoteAddress, (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`>> [${this._remoteAddress}:${this._remotePort}] ${command.toString()}`)
        resolve();
      });
    });
  }

  private async _enqueueCommand(command: CommandType, params?: Array<string | number>) {

  }

  private async _dequeueNextCommand() {

  }

  /**
   *
   * @private
   */
  private _bindSocket(): void {
    this._socket.on('error', (err) => {
      this.emit(CommanderEventEnum.error, err);
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
