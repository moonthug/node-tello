export interface IStateData {
  pitch: number;
  roll: number;
  yaw: number;
  vgx: number;
  vgy: number;
  vgz: number;
  templ: number;
  temph: number;
  tof: number;
  h: number;
  bat: number;
  baro: number;
  time: number;
  agx: number;
  agy: number;
  agz: number;
}

export class State {

  /**
   *
   */
  private readonly _pitch: number;
  private readonly _roll: number;
  private readonly _yaw: number;
  private readonly _vgx: number;
  private readonly _vgy: number;
  private readonly _vgz: number;
  private readonly _templ: number;
  private readonly _temph: number;
  private readonly _tof: number;
  private readonly _h: number;
  private readonly _bat: number;
  private readonly _baro: number;
  private readonly _time: number;
  private readonly _agx: number;
  private readonly _agy: number;
  private readonly _agz: number;

  /**
   *
   */
  constructor(stateData: IStateData) {
    this._pitch = stateData.pitch;
    this._roll = stateData.roll;
    this._yaw = stateData.yaw;
    this._vgx = stateData.vgx;
    this._vgy = stateData.vgy;
    this._vgz = stateData.vgz;
    this._templ = stateData.templ;
    this._temph = stateData.temph;
    this._tof = stateData.tof;
    this._h = stateData.h;
    this._bat = stateData.bat;
    this._baro = stateData.baro;
    this._time = stateData.time;
    this._agx = stateData.agx;
    this._agy = stateData.agy;
    this._agz = stateData.agz;
  }

  toString() {
    return `{
      pitch = ${this._pitch}
      roll = ${this._roll}
      yaw = ${this._yaw}
      vgx = ${this._vgx}
      vgy = ${this._vgy}
      vgz = ${this._vgz}
      templ = ${this._templ}
      temph = ${this._temph}
      tof = ${this._tof}
      h = ${this._h}
      bat = ${this._bat}
      baro = ${this._baro}
      time = ${this._time}
      agx = ${this._agx}
      agy = ${this._agy}
      agz = ${this._agz}
    }`;
  }
}

export function createStateFromString(input: string): State {
  const stateData: any = {};
  input.split(';')
    .forEach((keyVal: string) => {
      const keyValParts = keyVal.split(':');
      const key = keyValParts[0];
      stateData[key] = keyValParts[1];
    });

  return new State(stateData);
}
