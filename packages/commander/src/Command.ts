import { CommandType } from './types/CommandType';

/**
 * 
 */
export class Command {

  /**
   *
   */
  private readonly _commandType: CommandType;
  private readonly _params: Array<string | number>;
  private readonly _readCommand: boolean;

  /**
   *
   * @param commandType
   * @param params
   * @param readCommand
   */
  constructor(commandType: CommandType, params: Array<string | number>, readCommand: boolean) {
    this._commandType = commandType;
    this._params = params;
    this._readCommand = readCommand;
  }

  /**
   *
   */
  toString() {
    const commandSuffix = this._readCommand === true ? '?' : '';
    const paramsString = this._params && this._params.length > 0 ? ' ' + this._params.join(' ') : '';
    return `${this._commandType}${commandSuffix}${paramsString}`;
  }

  /**
   *
   */
  get commandType(): CommandType {
    return this._commandType;
  }

  /**
   *
   */
  get params(): Array<string | number> {
    return this._params;
  }

  /**
   *
   */
  get readCommand(): boolean {
    return this._readCommand;
  }
}
