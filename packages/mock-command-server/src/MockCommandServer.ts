import { createSocket, RemoteInfo, Socket } from 'dgram';

/**
 *
 */
export interface IMockCommandServerOptions {
  port: number;
}

/**
 *
 */
export class MockCommandServer {
  /**
   *
   */
  private readonly _port: number;
  private readonly _mocks: Map<string, string>;
  private readonly _socket: Socket;

  private _initialised: boolean;

  /**
   *
   */
  constructor (options: IMockCommandServerOptions) {
    this._port = options.port;
    this._initialised = false;

    this._mocks = new Map<string, string>();
    this._socket = createSocket('udp4');
  }

  /**
   *
   */
  initialise () {
    this._bindSocket();
    this._initialised = true;
  }

  /**
   *
   */
  addMock (message: string, response: string) {
    this._mocks.set(message, response);
  }

  /**
   *
   * @param messageBuffer
   * @param remoteInfo
   * @private
   */
  private _handleMessage(messageBuffer: Buffer, remoteInfo: RemoteInfo) {
    const message = messageBuffer.toString();
    console.log(`<< ${message}`);
    const response = this._mocks.get(message);

    if (response) {
      return this._sendResponse(response, remoteInfo.address, remoteInfo.port);
    }

    return this._sendResponse('ok', remoteInfo.address, remoteInfo.port);
  }

  /**
   *
   * @param response
   * @param address
   * @param port
   * @private
   */
  private async _sendResponse(response: string, address: string, port: number) {
    if (this._initialised === false) {
      throw new Error('Not initialised!');
    }

    return new Promise((resolve, reject) => {
      console.log(`>> [${address}:${port}] ${response}`);

      this._socket.send(response, port, address, (err) => {
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
  private _bindSocket () {
    this._socket.on('error', (err) => {
      console.error(err);
      this._socket.close();
    });

    this._socket.on('close', () => {
      console.log('socket closed');
      this._socket.close();
    });

    this._socket.on('message', (message: Buffer, remoteInfo: RemoteInfo) => {
      this._handleMessage(message, remoteInfo);
    });

    this._socket.on('listening', () => {
      const address = this._socket.address();
      console.log(`server listening ${address.address}:${address.port}`);
    });

    this._socket.bind(this._port);
  }

  /**
   *
   */
  get port(): number { return this._port; }
  get mocks(): Map<string, string> { return this._mocks; }
  get initialised(): boolean { return this._initialised; }
}
