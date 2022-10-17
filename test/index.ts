import testDefaultCommand from './command/defaultCommand';
import testCommandHistoryParser from './command/parser';
import { testCommandCompletion, testShell } from './command/util';

const tests: ReadonlyArray<Readonly<[() => void, 'only'?]>> = [
    [testCommandHistoryParser],
    [testCommandCompletion],
    [testShell],
    [testDefaultCommand],
];

const selectedTests = tests.filter(([_, only]) => only);

if (process.env.IS_CI && selectedTests.length) {
    throw new Error('cannot have "only" in ci cd');
}

(!selectedTests.length ? tests : selectedTests).forEach(([test]) => test());
