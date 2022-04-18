import testDefaultCommand from './command/defaultCommand';
import testCommandHistoryParser from './command/parser';
import { testCommandCompletion, testShell } from './command/util';

testCommandHistoryParser();
testCommandCompletion();
testShell();
testDefaultCommand();
