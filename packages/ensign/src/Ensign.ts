import { EventEmitter } from 'events';
import { Stream, Writable } from 'stream';

import createDatagramStream from 'datagram-stream';
import Split from 'stream-split';

const NALSeparator = new Buffer([0, 0, 0, 1])
/**
 *
 */
export interface IEnsignOptions {
  outStream: Writable,
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
  private readonly _inStream: Stream;
  private readonly _outStream: Writable;
  private readonly _localAddress: string;
  private readonly _localPort: number;

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

    this._outStream = localOptions.outStream;
    this._localAddress = localOptions.localAddress;
    this._localPort = localOptions.localPort;

    this._inStream = createDatagramStream({
      address: localOptions.localAddress,
      port: localOptions.localPort,
      broadcast: '255.255.255.255',
      reuseAddr: true
    });


    const NALSplitter = new Split(NALSeparator);
    NALSplitter.on('data', (data: Buffer) => {
      this._outStream.write(data);
    });

    this._inStream.pipe(NALSplitter);
  }

  /**
   *
   */
  initialise() {
  }

  /**
   *
   */
  get localAddress(): string { return this._localAddress; }
  get localPort(): number { return this._localPort; }
}
