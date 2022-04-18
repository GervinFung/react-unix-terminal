import * as React from 'react';
import Terminal from './component/Terminal';
import { Commands } from './command/util';
import styled, { ThemeProvider } from 'styled-components';
import { primaryTheme } from './theme/colorTheme';
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
}: ContainerProps &
    FlexibleHeightContainerProps &
    Readonly<{
        commands?: Commands;
        options?: Options;
        user: string;
        name: string;
    }>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <ThemeProvider theme={primaryTheme}>
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
    background-color: ${({ theme }) => theme.theme.background};
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
        background: ${({ theme }) => theme.theme.background};
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.theme.normalText};
    }

    background-color: ${({ theme }) => theme.theme.background};
    border: 2px solid ${({ theme }) => theme.theme.border};
    color: ${({ theme }) => theme.theme.normalText};
    font-family: ${({ fontFamily }: ContainerProps) => fontFamily}!important;
`;

const TerminalContainer = styled.div`
    box-sizing: border-box;
    min-height: 100%;
    background-color: ${({ theme }) => theme.theme.background};
    color: ${({ theme }) => theme.theme.normalText};
`;

export default ReactUnixTerminal;
