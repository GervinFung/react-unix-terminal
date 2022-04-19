import * as React from 'react';
import Terminal from './component/Terminal';
import { Commands } from './command/util';
import styled, { DefaultTheme, ThemeProvider } from 'styled-components';
import createCommands, { Options } from './command/defaultCommands';

type ContainerProps = Readonly<{
    fontFamily: string;
}>;

type FlexibleHeightContainerProps = Readonly<{
    height: string;
}>;

const ReactUnixTerminal = ({
    commands,
    options,
    height,
    user,
    name,
    fontFamily,
    theme,
}: ContainerProps &
    FlexibleHeightContainerProps &
    Readonly<{
        commands?: Commands;
        options?: Options;
        user: string;
        name: string;
        theme?: DefaultTheme;
    }>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider
            theme={
                theme ?? {
                    background: '#22292B',
                    normalText: '#E5C07B',
                    border: '#98C379',
                    name: '#67B0E8',
                    user: '#CE89DF',
                    promptSymbols: '#A89984',
                    error: '#F44747',
                    commandExists: '#67CBE7',
                    link: '#6CB5ED',
                }
            }
        >
            <FlexibleHeightContainer height={height}>
                <Container
                    fontFamily={fontFamily.split('+').join(' ')}
                    ref={containerRef}
                    onClick={() => {
                        const { current } = inputRef;
                        if (current) {
                            current.focus();
                        }
                    }}
                >
                    <TerminalContainer>
                        <Terminal
                            user={user}
                            name={name}
                            fontFamily={fontFamily}
                            commands={createCommands(commands, options)}
                            containerRef={containerRef}
                            inputRef={inputRef}
                        />
                    </TerminalContainer>
                </Container>
            </FlexibleHeightContainer>
        </ThemeProvider>
    );
};

const FlexibleHeightContainer = styled.div`
    padding: 14px 8px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background};
    height: ${({ height }: FlexibleHeightContainerProps) => height};
`;

const Container = styled.div`
    padding: 16px;
    border-radius: 4px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.background};
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.normalText};
    }

    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.normalText};
    font-family: ${({ fontFamily }: ContainerProps) => fontFamily}!important;
`;

const TerminalContainer = styled.div`
    box-sizing: border-box;
    min-height: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.normalText};
`;

export default ReactUnixTerminal;
