import parse from 'npm:parse-dont-validate@4.0.1';
import React from "https://dev.jspm.io/react@18.2.0";;
import {
    Commands,
    commandCompletion,
    isCommandExists,
    shell,
} from '../../command/util.ts';
import { CommandsHistory } from '../../hook/useCommandHistory.tsx';
import { AppContext } from '../../ReactUnixTerminal.tsx';
import Prompt from './Prompt.tsx';

const Input = ({
    inputRef,
    containerRef,
    command,
    commandsHistory,
    commands,
    lastCommandIndex,
    setCommand,
    setHistory,
    setLastCommandIndex,
    clearHistory,
    name,
    user,
}: Readonly<{
    inputRef: React.RefObject<HTMLInputElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    commandsHistory: () => CommandsHistory;
    commands: Commands;
    command: string;
    lastCommandIndex: number;
    setHistory: (output: string, commands: Commands) => void;
    setCommand: (command: string) => void;
    setLastCommandIndex: (lastCommandIndex: number) => void;
    clearHistory: () => void;
    name: string;
    user: string;
}>) => {
    const { theme } = React.useContext(AppContext);

    return (
        <div className="react-unix-terminal-shell-input-container">
            <label htmlFor="prompt">
                <Prompt user={user} name={name} />
            </label>
            <input
                ref={inputRef}
                id="prompt"
                type="text"
                value={command}
                onChange={({ target: { value } }) => setCommand(value)}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="react-unix-terminal-shell-input"
                style={{
                    color:
                        command === '' ||
                        isCommandExists({
                            command,
                            commands,
                        })
                            ? theme.commandExists
                            : theme.error,
                }}
                onKeyDown={async (event) => {
                    const { key, ctrlKey, code } = event;

                    switch (key) {
                        case 'c':
                            if (ctrlKey) {
                                event.preventDefault();
                                setCommand('');
                                setHistory('', commands);
                                setLastCommandIndex(0);
                            }
                            break;
                        case 'l':
                            if (ctrlKey) {
                                event.preventDefault();
                                clearHistory();
                            }
                            break;
                        case 'Tab':
                            event.preventDefault();
                            commandCompletion({
                                commands,
                                command,
                                setCommand,
                            });
                            break;
                        case 'Enter': {
                            if (code === 'Enter' || code === '13') {
                                event.preventDefault();
                                setLastCommandIndex(0);
                                await shell({
                                    commands,
                                    command,
                                    setHistory,
                                    clearHistory,
                                    setCommand,
                                });
                                const { current } = containerRef;
                                if (current) {
                                    current.scrollTo(0, current.scrollHeight);
                                }
                            }
                            break;
                        }
                        case 'ArrowUp': {
                            event.preventDefault();
                            const previousCommands = commandsHistory();
                            const { length } = previousCommands;
                            if (length) {
                                const index = lastCommandIndex + 1;
                                if (index <= length) {
                                    setLastCommandIndex(index);
                                    setCommand(
                                        parse(
                                            previousCommands[
                                                previousCommands.length - index
                                            ]?.command,
                                        )
                                            .asString()
                                            .elseThrow(
                                                `${previousCommands.join()} to have specified command at index ${
                                                    previousCommands.length -
                                                    index
                                                }`,
                                            ),
                                    );
                                }
                            }
                            break;
                        }
                        case 'ArrowDown': {
                            event.preventDefault();
                            const previousCommands = commandsHistory();
                            const { length } = previousCommands;
                            if (length) {
                                const index = lastCommandIndex - 1;
                                if (index < 1) {
                                    setLastCommandIndex(0);
                                    setCommand('');
                                } else {
                                    setLastCommandIndex(index);
                                    setCommand(
                                        parse(
                                            previousCommands[length - index]
                                                ?.command,
                                        )
                                            .asString()
                                            .elseThrow(
                                                `${previousCommands.join()} to have specified command`,
                                            ),
                                    );
                                }
                            }
                            break;
                        }
                    }
                }}
            />
        </div>
    );
};

export default Input;
