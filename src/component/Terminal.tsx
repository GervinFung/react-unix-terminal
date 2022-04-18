import * as React from 'react';
import History from './command/History';
import Input from './command/Input';
import useCommandHistory from '../hook/useCommandHistory';
import { Commands } from '../command/util';
import Font from './common/FontTag';
import styled from 'styled-components';

const Terminal = ({
    commands,
    fontFamily,
    inputRef,
    containerRef,
    name,
    user,
}: Readonly<{
    commands: Commands;
    fontFamily: string;
    inputRef: React.RefObject<HTMLInputElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    name: string;
    user: string;
}>) => {
    const {
        history,
        commandsHistory,
        command,
        lastCommandIndex,
        setCommand,
        setHistory,
        clearHistory,
        setLastCommandIndex,
    } = useCommandHistory();

    React.useEffect(() => {
        const { banner } = commands;
        if (banner) {
            setHistory(banner(), commands);
        }
    }, []);

    React.useEffect(() => {
        const { current } = inputRef;
        if (current) {
            current.focus();
        }
    }, [history]);

    return (
        <Container>
            <InnerContainer ref={containerRef}>
                <Font fontFamily={fontFamily} />
                <History name={name} user={user} history={history} />
                <Input
                    name={name}
                    user={user}
                    commands={commands}
                    inputRef={inputRef}
                    containerRef={containerRef}
                    command={command}
                    commandsHistory={commandsHistory}
                    lastCommandIndex={lastCommandIndex}
                    setCommand={setCommand}
                    setHistory={setHistory}
                    setLastCommandIndex={setLastCommandIndex}
                    clearHistory={clearHistory}
                />
            </InnerContainer>
        </Container>
    );
};

const Container = styled.div`
    white-space: pre-wrap;
`;

const InnerContainer = styled.div`
    overflow-y: auto;
    height: 100%;
`;

export default Terminal;
