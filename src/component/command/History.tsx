import * as React from 'react';
import styled from 'styled-components';
import { History as Hist } from '../../hook/useCommandHistory';
import Prompt from './Prompt';
import sanitizeHtml from 'sanitize-html';
import parse from 'html-react-parser';

const History = ({
    history,
    name,
    user,
}: Readonly<{
    history: Hist;
    name: string;
    user: string;
}>) => (
    <>
        {history.map((entry, index) => (
            <div key={`${entry.command}${index}`}>
                <PromptInputContainer>
                    <div>
                        <Prompt user={user} name={name} />
                    </div>
                    <Command isCommandExists={entry.isExist}>
                        {entry.command}
                    </Command>
                </PromptInputContainer>
                <Output>{parse(sanitizeHtml(entry.output))}</Output>
            </div>
        ))}
    </>
);

const PromptInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Output = styled.p`
    padding: 0;
    margin: 4px 0;
    word-break: break-word;
    white-space: pre-wrap;
    line-height: normal;
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.link};
    }
`;

const Command = styled.div`
    color: ${({
        isCommandExists,
    }: Readonly<{
        isCommandExists: boolean;
    }>) =>
        isCommandExists
            ? ({ theme }) => theme.commandExists
            : ({ theme }) => theme.error};
`;

export default History;
