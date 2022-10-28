import * as React from 'react';
import Terminal from './component/Terminal';
import { Commands } from './command/util';
import createCommands, { Options } from './command/defaultCommands';
import Theme from './theme/Theme';

const AppContext = React.createContext({
    theme: {
        background: '#22292B',
        normalText: '#E5C07B',
        border: '#98C379',
        name: '#67B0E8',
        user: '#CE89DF',
        promptSymbols: '#A89984',
        error: '#F44747',
        commandExists: '#67CBE7',
        link: '#6CB5ED',
    } as Theme,
});

/**
 * If you are seeing this message, please import css file, like so, `import 'react-unix-terminal/build/style.css'`
 */
const ReactUnixTerminal = ({
    commands,
    options,
    height,
    width,
    user,
    name,
    fontFamily,
    theme,
}: Readonly<{
    commands?: Commands;
    options?: Options;
    height: string;
    width: string;
    user: string;
    name: string;
    fontFamily: string;
    theme?: Theme;
}>) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const cssVariableRef = React.useRef<HTMLDivElement>(null);

    const appContext = React.useContext(AppContext);

    const chosenTheme = theme ?? appContext.theme;

    React.useEffect(() => {
        const { current } = cssVariableRef;
        //ref: https://www.w3schools.com/css/css3_variables_javascript.asp
        if (current) {
            const {
                background,
                normalText,
                border,
                name,
                user,
                promptSymbols,
                link,
            } = chosenTheme;
            current.style.setProperty(
                '--react-unix-terminal-background',
                background,
            );
            current.style.setProperty(
                '--react-unix-terminal-scrollbar-thumb',
                promptSymbols,
            );
            current.style.setProperty(
                '--react-unix-terminal-normal-text',
                normalText,
            );
            current.style.setProperty('--react-unix-terminal-border', border);
            current.style.setProperty('--react-unix-terminal-name', name);
            current.style.setProperty('--react-unix-terminal-user', user);
            current.style.setProperty(
                '--react-unix-terminal-prompt-symbols',
                promptSymbols,
            );
            current.style.setProperty('--react-unix-terminal-link', link);
            current.style.setProperty(
                '--react-unix-terminal-font-family',
                fontFamily.split('+').join(' '),
            );
        }
    }, [chosenTheme.background]);

    return (
        <AppContext.Provider
            value={{
                ...appContext,
                theme: chosenTheme,
            }}
        >
            <div
                ref={cssVariableRef}
                className="react-unix-terminal-terminal-outermost-container"
            >
                <div
                    className="react-unix-terminal-terminal-flexible-height-width-app-container"
                    style={{
                        height,
                        width,
                    }}
                >
                    <div
                        ref={containerRef}
                        className="react-unix-terminal-terminal-scrollable-container"
                        onClick={() => {
                            const { current } = inputRef;
                            if (current) {
                                current.focus();
                            }
                        }}
                    >
                        <div className="react-unix-terminal-terminal-container">
                            <Terminal
                                user={user}
                                name={name}
                                fontFamily={fontFamily}
                                commands={createCommands(commands, options)}
                                containerRef={containerRef}
                                inputRef={inputRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
};

export { AppContext };

export default ReactUnixTerminal;
