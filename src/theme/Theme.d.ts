import 'styled-components';

type Theme = Readonly<{
    background: '#22292B';
    normalText: '#E5C07B';
    border: '#98C379';
    name: '#67B0E8';
    user: '#CE89DF';
    promptSymbols: '#A89984';
    error: '#F44747';
    commandExists: '#67CBE7';
    link: '#6CB5ED';
}>;

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly theme: Theme;
    }
}

export { Theme };
