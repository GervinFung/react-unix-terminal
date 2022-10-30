import parse from 'parse-dont-validate';
import { CommandsHistory } from '../hook/useCommandHistory';

const parseAsCommandHistory = (commands: any): CommandsHistory =>
    !commands
        ? []
        : parse(JSON.parse(commands))
              .asReadonlyArray((command) => ({
                  timeCreated: new Date(
                      parse(command.timeCreated)
                          .asString()
                          .elseThrow(
                              `timeCreated is not an ISO string, it is ${command.timeCreated}`,
                          ),
                  ),
                  command: parse(command.command)
                      .asString()
                      .elseThrow(
                          `command is not a string, it is ${command.command}`,
                      ),
              }))
              .elseThrow(`commands is not an array, it is ${commands}`);

export default parseAsCommandHistory;
