# **react-unix-terminal**

I want to build a web terminal, not a real one of course, but to simulate one with executable command

Therefore I built it, then I figure it can be published as NPM package

Hence, I published it

### How do I use it?

```ts
import * as React from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'react-unix-terminal';

ReactDOM.render(
    <React.StrictMode>
        <Terminal
            user="guest"
            name="poolofdeath20"
            fontFamily="JetBrains+Mono"
            height="100vh"
        />
    </React.StrictMode>,
    document.getElementById('root'),
);
```

### Will show in web as

![alt output](doc/img/demo.png)

### Can I raise an issue?

Why not? Feel free to raise an issue if you have a question, an enhancement, or a bug report.

### Can I contribute

I need help for the following features 🙂

-   [ ] Customizable theme
-   [ ] More usable default command

However, before contributing, I would prefer if you could

-   Use TypeScript
-   Write Test Code

### Changes

Kindly refer to [CHANGELOG](https://github.com/P-YNPM/react-unix-terminal/blob/main/CHANGELOG.md)

### How to install

```sh
yarn add react-unix-terminal
```

OR

```sh
npm i react-unix-terminal
```
