import { EventEmitter } from 'events';
import { Commander } from '@node-tello/commander';

export interface IDroneOptions {
  address: string;
  commandPort: number;
  statePort: number;
}


export class Drone extends EventEmitter {

  /**
   *
   */
  private readonly commander: Commander;

  /**
   *
   */
  constructor (options: IDroneOptions) {
    super();

    this.commander = new Commander({
      address: options.address,
      port: options.commandPort
    });
    
  }
}
