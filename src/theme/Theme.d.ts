import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly background: string;
        readonly normalText: string;
        readonly border: string;
        readonly name: string;
        readonly user: string;
        readonly promptSymbols: string;
        readonly error: string;
        readonly commandExists: string;
        readonly link: string;
    }
}
