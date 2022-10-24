import parseAsCommandHistory from '../../src/command/parser';
import { it, describe, expect } from 'vitest';

const testCommandHistoryParser = () =>
    describe('command history parser', () => {
        it('should parse command history successfully', () => {
            const stringifiedHistory = JSON.stringify([
                { timeCreated: '2022-04-18T01:46:16.116Z', command: 'help' },
                { timeCreated: '2022-04-18T01:50:48.320Z', command: 'tsc' },
                { timeCreated: '2022-04-18T03:40:42.896Z', command: 'julia' },
                { timeCreated: '2022-04-18T03:43:13.874Z', command: 'history' },
            ]);
            const history = parseAsCommandHistory(stringifiedHistory);
            expect(
                history.every(
                    ({ command, timeCreated }) =>
                        typeof command === 'string' &&
                        timeCreated instanceof Date,
                ),
            ).toBe(true);
        });
        it('should fail to parse command history because one of the command is not string', () => {
            const stringifiedHistory = JSON.stringify([
                { timeCreated: '2022-04-18T01:46:16.116Z', command: 'help' },
                { timeCreated: '2022-04-18T01:50:48.320Z', command: 'tsc' },
                { timeCreated: '2022-04-18T03:40:42.896Z', command: 'julia' },
                { timeCreated: '2022-04-18T03:43:13.874Z', command: 123 },
            ]);
            expect(() =>
                parseAsCommandHistory(stringifiedHistory),
            ).toThrowError();
        });
        it('should fail to parse command history because one of the timeCreated cannot be parse as date', () => {
            const stringifiedHistory = [
                { timeCreated: '2022-04-18T01:46:16.116Z', command: 'help' },
                { timeCreated: '2022-04-18T01:50:48.320Z', command: 'tsc' },
                { timeCreated: '2022-04-18T03:40:42.896Z', command: 'julia' },
                { timeCreated: '2022-04-18T03:43:13.874Z', command: 123 },
            ];
            expect(() =>
                parseAsCommandHistory(stringifiedHistory),
            ).toThrowError();
        });
    });

export default testCommandHistoryParser;
