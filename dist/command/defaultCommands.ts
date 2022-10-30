import { Commands, commandsHistory, key } from './util.ts';

type NullableCommands = Commands | undefined;

type Options =
    | Readonly<{
          disableDefaultCommand?: boolean;
      }>
    | undefined;

const createCommands = (
    commands: NullableCommands,
    options: Options,
): Commands => {
    const appendedCommands = options?.disableDefaultCommand
        ? commands
        : {
              //default
              history: () =>
                  commandsHistory()
                      .map(
                          ({ command, timeCreated }) =>
                              `executed at: ${timeCreated
                                  .toString()
                                  .split(' ')
                                  .filter((_, index) => index < 5)
                                  .join(' ')}, command: ${command}`,
                      )
                      .join('\n'),
              clearhist: () => {
                  localStorage.setItem(key, JSON.stringify([]));
                  return 'history cleared';
              },
              whoami: () => 'guest',
              clear: () => '',
              date: () => new Date().toString(),
              ...commands,
          };

    const helper = options?.disableDefaultCommand
        ? undefined
        : {
              help: () =>
                  `List of available commands:\n\n${(!appendedCommands
                      ? []
                      : Object.keys(appendedCommands)
                  )
                      .concat('help')
                      .sort()
                      .join(
                          '\n',
                      )}\n\n[tab]\t command completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`,
          };
    return {
        //custom
        ...helper,
        ...appendedCommands,
    };
};

export type { Options };
export default createCommands;
