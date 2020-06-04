import { EventEmitter } from 'events';

import { Commander, ControlCommandEnum, ReadCommandEnum, SetCommandEnum } from '@node-tello/commander';
import { Cadet, State } from '@node-tello/cadet';
// import { Ensign } from '@node-tello/ensign';

import { DroneEventEnum } from './enums/DroneEvent';

/**
 *
 */
export interface IDroneOptions {
  address?: string;
  commandPort?: number;
  statePort?: number;
  videoPort?: number;
}

/**
 *
 */
export class Drone extends EventEmitter {

  /**
   *
   */
  private readonly commander: Commander;
  private readonly cadet: Cadet;
  // private readonly ensign: Ensign;

  /**
   *
   */
  constructor (options?: IDroneOptions) {
    super();

    const defaults = {
      address: '192.168.10.1',
      commandPort: 8889,
      statePort: 8890,
      videoPort: 11111
    };

    const localOptions = {
      ...defaults,
      ...options
    };

    this.commander = new Commander({
      remoteAddress: localOptions.address,
      remotePort: localOptions.commandPort
    });

    this.cadet = new Cadet({
      localPort: localOptions.statePort
    });

    // this.ensign = new Ensign({
    //   localPort: localOptions.videoPort
    // });
  }

  /**
   *
   */
  async initalise() {
    this.cadet.on('state', (state: State) => this.emit(DroneEventEnum.state, state));

    this.cadet.initialise();
    await this.commander.initialise();
  }

  /**
   *
   */
  disconnect() {
    this.commander.destroy();
  }

  // Control
  takeoff() { return this.commander.control(ControlCommandEnum.takeoff); }
  land() { return this.commander.control(ControlCommandEnum.land); }
  streamOn() { return this.commander.control(ControlCommandEnum.streamon); }
  streamOff() { return this.commander.control(ControlCommandEnum.streamoff); }
  emergency() { return this.commander.control(ControlCommandEnum.emergency); }
  up(x: number) { return this.commander.control(ControlCommandEnum.up, [x]); }
  down(x: number) { return this.commander.control(ControlCommandEnum.down, [x]); }
  left(x: number) { return this.commander.control(ControlCommandEnum.left, [x]); }
  right(x: number) { return this.commander.control(ControlCommandEnum.right, [x]); }
  forward(x: number) { return this.commander.control(ControlCommandEnum.forward, [x]); }
  back(x: number) { return this.commander.control(ControlCommandEnum.back, [x]); }
  cw() { return this.commander.control(ControlCommandEnum.cw); }
  ccw() { return this.commander.control(ControlCommandEnum.ccw); }
  flip() { return this.commander.control(ControlCommandEnum.flip); }
  go() { return this.commander.control(ControlCommandEnum.go); }
  stop() { return this.commander.control(ControlCommandEnum.stop); }
  curve() { return this.commander.control(ControlCommandEnum.curve); }
  jump() { return this.commander.control(ControlCommandEnum.jump); }

  // Set
  setSpeed() { return this.commander.set(SetCommandEnum.speed); }
  setRc() { return this.commander.set(SetCommandEnum.rc); }
  setWifi() { return this.commander.set(SetCommandEnum.wifi); }
  enabledMission() { return this.commander.set(SetCommandEnum.mon); }
  disableMission() { return this.commander.set(SetCommandEnum.moff); }
  setMissionDirection() { return this.commander.set(SetCommandEnum.mdirection); }
  setAp() { return this.commander.set(SetCommandEnum.ap); }

  // Read
  getSpeed() { return this.commander.read(ReadCommandEnum.speed); }
  getBattery() { return this.commander.read(ReadCommandEnum.battery); }
  getTime() { return this.commander.read(ReadCommandEnum.time); }
  getWifi() { return this.commander.read(ReadCommandEnum.wifi); }
  getSDK() { return this.commander.read(ReadCommandEnum.sdk); }
  getSerialNumber() { return this.commander.read(ReadCommandEnum.sn); }
}
