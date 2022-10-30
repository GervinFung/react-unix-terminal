import React from "https://dev.jspm.io/react@18.2.0";;
import {
    Commands,
    commandsHistory,
    isCommandExists,
    key,
} from '../command/util.ts';

type Command = string;

type History = ReadonlyArray<
    Readonly<{
        id: number;
        timeCreated: Date;
        isExist: boolean;
        command: Command;
        output: string;
    }>
>;
type CommandsHistory = ReadonlyArray<
    Readonly<{
        command: Command;
        timeCreated: Date;
    }>
>;

const useCommandHistory = () => {
    const [state, setState] = React.useState({
        history: [] as History,
        command: '',
        lastCommandIndex: 0,
        shouldSaveLocally: false,
    });

    const { command, history, lastCommandIndex, shouldSaveLocally } = state;

    React.useEffect(() => {
        if (shouldSaveLocally) {
            localStorage.setItem(
                key,
                JSON.stringify(
                    commandsHistory().concat(
                        history
                            .filter(
                                ({ command }, index, arr) =>
                                    index === arr.length - 1 && command,
                            )
                            .map(({ command, timeCreated }) => ({
                                command,
                                timeCreated,
                            })),
                    ),
                ),
            );
        }
    }, [history.length]);

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            shouldSaveLocally: true,
        }));
    }, []);

    return {
        history,
        command,
        lastCommandIndex,
        commandsHistory,
        setHistory: (output: string, commands: Commands) =>
            setState((prev) => ({
                ...prev,
                history: [
                    ...prev.history,
                    {
                        id: history.length,
                        timeCreated: new Date(),
                        isExist: isCommandExists({
                            command,
                            commands,
                        }),
                        command,
                        output,
                    },
                ],
            })),
        setCommand: (command: string) =>
            setState((prev) => ({
                ...prev,
                command,
            })),
        setLastCommandIndex: (lastCommandIndex: number) =>
            setState((prev) => ({
                ...prev,
                lastCommandIndex,
            })),
        clearHistory: () =>
            setState((prev) => ({
                ...prev,
                history: [],
            })),
    };
};

export type { CommandsHistory, History };
export default useCommandHistory;
