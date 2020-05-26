import { ControlCommand } from '../enums/ControlCommand';
import { ReadCommand } from '../enums/ReadCommand';
import { SetCommand } from '../enums/SetCommand';

export type Command = ControlCommand | ReadCommand | SetCommand;
