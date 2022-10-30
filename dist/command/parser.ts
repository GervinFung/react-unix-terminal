import parse from 'https://raw.githubusercontent.com/Packer-Man/parse-dont-validate/main/dist/mod.ts';
import { CommandsHistory } from '../hook/useCommandHistory.tsx';

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
