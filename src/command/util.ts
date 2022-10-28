import parse from 'parse-dont-validate';
import parseAsCommandHistory from './parser';

type Commands = Readonly<{
    [key: string]: () => string;
}>;

const key = 'term-command-hist';

const commandsHistory = () => parseAsCommandHistory(localStorage.getItem(key));

const isCommandExists = ({
    commands,
    command,
}: Readonly<{
    commands: Commands;
    command: string;
}>) =>
    Object.keys(commands).find((comm) => comm === command.split(' ')[0]) !==
    undefined;

const commandCompletion = ({
    commands,
    command,
    setCommand,
}: Readonly<{
    commands: Commands;
    command: string;
    setCommand: (command: string) => void;
}>) => {
    if (command) {
        const matchingCommand = Object.keys(commands).find((entry) =>
            entry.startsWith(command),
        );
        if (matchingCommand) {
            setCommand(matchingCommand);
        }
    }
};

const shell = async ({
    commands,
    command,
    setHistory,
    clearHistory,
    setCommand,
}: Readonly<{
    commands: Commands;
    command: string;
    setHistory: (output: string, commands: Commands) => void;
    clearHistory: () => void;
    setCommand: (command: string) => void;
}>) => {
    const args = command.split(' ');
    const arg = parse(args[0])
        .asString()
        .elseThrow(`arg is not a string, it is ${args.join(' ')}`);

    if (command === 'clearhist') {
        clearHistory();
    }

    if (command === 'clear') {
        clearHistory();
    } else if (command === '') {
        setHistory('', commands);
    } else if (
        !isCommandExists({
            command,
            commands,
        })
    ) {
        setHistory(
            `shell: command not found: ${arg}. Try 'help' to get started.`,
            commands,
        );
    } else {
        const func = commands[arg];
        if (!func) {
            throw new Error(
                `there is no callable function for argument of ${arg}`,
            );
        }
        setHistory(func(), commands);
    }
    setCommand('');
};

export type { Commands };

export { isCommandExists, commandCompletion, shell, commandsHistory, key };
