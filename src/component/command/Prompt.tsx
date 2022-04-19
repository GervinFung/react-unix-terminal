import * as React from 'react';
import styled from 'styled-components';

const Prompt = ({
    user,
    name,
}: Readonly<{
    user: string;
    name: string;
}>) => (
    <div>
        <User>{user}</User>
        <Symbols>@</Symbols>
        <Name>{name}</Name>
        <Input>~&gt;</Input>
    </div>
);

const User = styled.span`
    color: ${({ theme }) => theme.user};
`;

const Name = styled.span`
    color: ${({ theme }) => theme.name};
`;

const Symbols = styled.span`
    color: ${({ theme }) => theme.promptSymbols};
`;

const Input = styled(Symbols)`
    margin: 0 8px;
`;

export default Prompt;
