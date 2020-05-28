import { ControlCommandEnum } from '../enums/ControlCommand';
import { ReadCommandEnum } from '../enums/ReadCommand';
import { SetCommandEnum } from '../enums/SetCommand';

export type CommandType = ControlCommandEnum | ReadCommandEnum | SetCommandEnum;
