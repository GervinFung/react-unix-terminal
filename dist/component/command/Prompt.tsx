import React from "https://dev.jspm.io/react@18.2.0";;

const Prompt = ({
    user,
    name,
}: Readonly<{
    user: string;
    name: string;
}>) => (
    <div>
        <span className="react-unix-terminal-user">{user}</span>
        <span className="react-unix-terminal-prompt-symbols">@</span>
        <span className="react-unix-terminal-name">{name}</span>
        <span className="react-unix-terminal-prompt-symbols react-unix-terminal-prompt-input-arrow">
            ~&gt;
        </span>
    </div>
);

export default Prompt;
