import { parseAsReadonlyArray, parseAsString } from 'parse-dont-validate';
import { CommandsHistory } from '../hook/useCommandHistory';

const parseAsCommandHistory = (commands: any): CommandsHistory =>
    !commands
        ? []
        : parseAsReadonlyArray(JSON.parse(commands), (command) => ({
              timeCreated: new Date(
                  parseAsString(command.timeCreated).elseThrow(
                      `timeCreated is not an ISO string, it is ${command.timeCreated}`,
                  ),
              ),
              command: parseAsString(command.command).elseThrow(
                  `command is not a string, it is ${command.command}`,
              ),
          })).elseThrow(`commands is not an array, it is ${commands}`);

export default parseAsCommandHistory;
