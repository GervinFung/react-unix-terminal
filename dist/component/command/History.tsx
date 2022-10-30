import React from "https://dev.jspm.io/react@18.2.0";;
import { History as Hist } from '../../hook/useCommandHistory.tsx';
import Prompt from './Prompt.tsx';
import sanitizeHtml from 'npm:sanitize-html@2.7.3';
import parse from 'npm:html-react-parser@3.0.4';
import { AppContext } from '../../ReactUnixTerminal.tsx';

const History = ({
    history,
    name,
    user,
}: Readonly<{
    history: Hist;
    name: string;
    user: string;
}>) => {
    const { theme } = React.useContext(AppContext);

    return (
        <>
            {history.map((entry, index) => (
                <div key={`${entry.command}${index}`}>
                    <div className="react-unix-terminal-history-container">
                        <div>
                            <Prompt user={user} name={name} />
                        </div>
                        <div
                            className="react-unix-terminal-command-entered"
                            style={{
                                color: entry.isExist
                                    ? theme.commandExists
                                    : theme.error,
                            }}
                        >
                            {entry.command}
                        </div>
                    </div>
                    <p className="react-unix-terminal-output">
                        {parse(sanitizeHtml(entry.output))}
                    </p>
                </div>
            ))}
        </>
    );
};

export default History;
