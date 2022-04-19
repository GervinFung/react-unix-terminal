import * as React from 'react';
import { History as Hist } from '../../hook/useCommandHistory';
import Prompt from './Prompt';
import sanitizeHtml from 'sanitize-html';
import parse from 'html-react-parser';
import { AppContext } from '../../ReactUnixTerminal';

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
