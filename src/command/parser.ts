import { parseAsReadonlyArray, parseAsString } from 'parse-dont-validate';
import { CommandsHistory } from '../hook/useCommandHistory';

const parseAsCommandHistory = (commands: any): CommandsHistory =>
    !commands
        ? []
        : parseAsReadonlyArray(JSON.parse(commands), (command) => ({
              timeCreated: new Date(
                  parseAsString(command.timeCreated).orElseThrowDefault(
                      'timeCreated',
                  ),
              ),
              command: parseAsString(command.command).orElseThrowDefault(
                  'command',
              ),
          })).orElseThrowDefault('commands');

export default parseAsCommandHistory;
