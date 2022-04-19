import * as React from 'react';
import ReactDOM from 'react-dom';
import ReactUnixTerminal from './ReactUnixTerminal';

ReactDOM.render(
    <React.StrictMode>
        <ReactUnixTerminal
            user="guest"
            name="poolofdeath20"
            fontFamily="JetBrains+Mono"
            height="100vh"
            width="100%"
            commands={{
                julia: () => '<a href="www.google.com">google</a>',
            }}
        />
    </React.StrictMode>,
    document.getElementById('root'),
);
