import testDefaultCommand from './command/defaultCommand';
import testCommandHistoryParser from './command/parser';
import { testCommandCompletion, testShell } from './command/util';
import testCases from 'cases-of-test';

testCases({
    tests: [
        [testCommandHistoryParser],
        [testCommandCompletion],
        [testShell],
        [testDefaultCommand],
    ],
});
