import { parseAsString } from 'parse-dont-validate';
import * as React from 'react';
import styled from 'styled-components';
import {
    Commands,
    commandCompletion,
    isCommandExists,
    shell,
} from '../../command/util';
import { CommandsHistory } from '../../hook/useCommandHistory';
import Prompt from './Prompt';

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
}>) => (
    <Container>
        <label htmlFor="prompt">
            <Prompt user={user} name={name} />
        </label>
        <ShellInput
            ref={inputRef}
            isCommandExists={
                command === '' ||
                isCommandExists({
                    command,
                    commands,
                })
            }
            id="prompt"
            type="text"
            value={command}
            onChange={({ target: { value } }) => setCommand(value)}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
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
                                    parseAsString(
                                        previousCommands[
                                            previousCommands.length - index
                                        ]?.command,
                                    ).orElseThrowCustom(
                                        `${previousCommands.join()} to have specified command at index ${
                                            previousCommands.length - index
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
                                    parseAsString(
                                        previousCommands[length - index]
                                            ?.command,
                                    ).orElseThrowCustom(
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
    </Container>
);

const Container = styled.div`
    display: flex;
    overflow: auto;
    height: 100%;
`;

const ShellInput = styled.input`
    background: transparent;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    width: 100%;
    color: ${({
        isCommandExists,
    }: Readonly<{
        isCommandExists: boolean;
    }>) =>
        isCommandExists
            ? ({ theme }) => theme.theme.commandExists
            : ({ theme }) => theme.theme.error};
`;

export default Input;
