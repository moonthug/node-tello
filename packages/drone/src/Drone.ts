import { EventEmitter } from 'events';
import { Commander, ControlCommand, ReadCommand, SetCommand } from '@node-tello/commander';

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
      remoteAddress: options.address,
      remotePort: options.commandPort
    });

    this.commander.initialise();
  }

  // Control
  takeoff() { return this.commander.control(ControlCommand.takeoff); }
  land() { return this.commander.control(ControlCommand.land); }
  streamOn() { return this.commander.control(ControlCommand.streamon); }
  streamOff() { return this.commander.control(ControlCommand.streamoff); }
  emergency() { return this.commander.control(ControlCommand.emergency); }
  up(x: number) { return this.commander.control(ControlCommand.up, [x]); }
  down(x: number) { return this.commander.control(ControlCommand.down, [x]); }
  left(x: number) { return this.commander.control(ControlCommand.left, [x]); }
  right(x: number) { return this.commander.control(ControlCommand.right, [x]); }
  forward(x: number) { return this.commander.control(ControlCommand.forward, [x]); }
  back(x: number) { return this.commander.control(ControlCommand.back, [x]); }
  cw() { return this.commander.control(ControlCommand.cw); }
  ccw() { return this.commander.control(ControlCommand.ccw); }
  flip() { return this.commander.control(ControlCommand.flip); }
  go() { return this.commander.control(ControlCommand.go); }
  stop() { return this.commander.control(ControlCommand.stop); }
  curve() { return this.commander.control(ControlCommand.curve); }
  jump() { return this.commander.control(ControlCommand.jump); }

  // Set
  setSpeed() { return this.commander.set(SetCommand.speed); }
  setRc() { return this.commander.set(SetCommand.rc); }
  setWifi() { return this.commander.set(SetCommand.wifi); }
  enabledMission() { return this.commander.set(SetCommand.mon); }
  disableMission() { return this.commander.set(SetCommand.moff); }
  setMissionDirection() { return this.commander.set(SetCommand.mdirection); }
  setAp() { return this.commander.set(SetCommand.ap); }

  // Read
  getSpeed() { return this.commander.read(ReadCommand.speed); }
  getBattery() { return this.commander.read(ReadCommand.battery); }
  getTime() { return this.commander.read(ReadCommand.time); }
  getWifi() { return this.commander.read(ReadCommand.wifi); }
  getSDK() { return this.commander.read(ReadCommand.sdk); }
  getSerialNumber() { return this.commander.read(ReadCommand.sn); }
}
