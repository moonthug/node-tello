import { EventEmitter } from 'events';
import { createSocket, Socket } from 'dgram';

import { Command } from './Command';
import { Response } from './Response';
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

export interface ISendCommandOptions {
  readCommand?: boolean;
  timeout?: number;
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
  async initialise() {
    this._bindSocket();
    await this._sendCommand(ControlCommandEnum.command);
    this._initialised = true;
  }

  async destroy() {
    this._socket.close();
    this._socket.removeAllListeners()
  }

  /**
   *
   * @param command
   * @param params
   */
  async control(command: ControlCommandEnum, params?: Array<string | number>): Promise<boolean> {
    const response = await this._sendCommand(command, params);
    return response.success;
  }

  /**
   *
   * @param command
   * @param params
   */
  async set(command: SetCommandEnum, params?: Array<string | number>): Promise<boolean> {
    const response = await this._sendCommand(command, params);
    return response.success;
  }

  /**
   *
   * @param command
   * @param params
   */
  async read(command: ReadCommandEnum, params?: Array<string | number>): Promise<string> {
    const response = await this._sendCommand(command, params, { readCommand: true });
    return response.value;
  }

  /**
   *
   * @param commandType
   * @param params
   * @param options
   */
  private async _sendCommand(
    commandType: CommandType,
    params?: Array<string | number>,
    options?: ISendCommandOptions
  ): Promise<Response> {
    const localOptions = {
      readCommand: false,
      timeout: 2000,
      ...options
    };

    // Move to queue
    const command = new Command(commandType, params, localOptions.readCommand);
    return new Promise((resolve, reject) => {
      this._socket.send(command.toString(), this._remotePort, this._remoteAddress, (err) => {
        if (err) {
          return reject(err);
        }
        console.log(`>> ${ command.toString() }`);
      });

      // const timeout = setInterval(() => {
      //   return reject(new Error(`Command timed out: ${ command.toString() }...`));
      // }, localOptions.timeout);

      this._socket.once('message', (messageData: Buffer) => {
        // clearInterval(timeout);

        console.log(`<< ${ messageData.toString() }`);

        const response = new Response(messageData);

        if (response.success === false) {
          return reject(new Error(`Tello Error: ${ response.error }`));
        }

        resolve(response);
      });
    });
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
