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
        />
    </React.StrictMode>,
    document.getElementById('root'),
);
