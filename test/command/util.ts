import {
    isCommandExists,
    commandCompletion,
    shell,
} from '../../src/command/util';

const testCommandCompletion = () => {
    describe('command completion', () => {
        const commands = {
            vi: () => `why use vi? when you can use 'vim'.`,
            nvim: () => `why use nvim? is 'emacs' that bad?`,
            emacs: () => `really? emacs? you should be using 'nvim'`,
        };
        it('should return its closest matching command for exisiting commands', () => {
            Object.keys(commands).every((com) =>
                commandCompletion({
                    commands,
                    command: com.charAt(0),
                    setCommand: (command) => expect(command).toBe(com),
                }),
            );
        });
        it('should return undefined for non-exisiting command', () => {
            commandCompletion({
                commands,
                command: 'vim',
                setCommand: (command) => expect(command).toBe(undefined),
            });
        });
    });
};

const testShell = () => {
    describe('shell', () => {
        const commands = {
            vi: () => `why use vi? when you can use 'vim'.`,
            vim: () => `no offense but vim? try 'nvim' instead.`,
            nvim: () => `why use nvim? is 'emacs' that bad?`,
            emacs: () => `really? emacs? you should be using 'nvim'`,
            nano: () => `nano? for real? have you give 'nvim' a try?`,
        };
        it('should execute command that exists', () => {
            Object.keys(commands).every(
                async (com) =>
                    await shell({
                        commands,
                        command: com,
                        setHistory: (output, commands) => {
                            expect(output).toBe(commands[com]());
                            expect(
                                isCommandExists({ commands, command: com }),
                            ).toBe(true);
                        },
                        clearHistory: () => {},
                        setCommand: (command) => expect(command).toBe(''),
                    }),
            );
        });
        it('should not execute command that do not exists', async () => {
            const com = 'clear';
            await shell({
                commands,
                command: com,
                setHistory: (output, commands) => {
                    expect(output).toBe(undefined);
                    expect(isCommandExists({ commands, command: com })).toBe(
                        true,
                    );
                },
                clearHistory: () => {},
                setCommand: (command) => expect(command).toBe(''),
            });
        });
    });
};

export { testCommandCompletion, testShell };
