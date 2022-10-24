import createCommands from '../../src/command/defaultCommands';
import { it, describe, expect } from 'vitest';

const testDefaultCommand = () =>
    describe('default command', () => {
        const numberOfDefaultCommands = 6;
        it('should return all default commands with executable function', () => {
            const commands = createCommands(undefined, undefined);
            expect(
                Object.keys(commands).every(
                    (value) => typeof commands[value] === 'function',
                ),
            ).toBe(true);
            expect(Object.keys(commands).length).toBe(numberOfDefaultCommands);
            const passedOptionCommands = createCommands(undefined, {
                disableDefaultCommand: false,
            });
            expect(
                Object.keys(passedOptionCommands).every(
                    (value) =>
                        typeof passedOptionCommands[value] === 'function',
                ),
            ).toBe(true);
            expect(Object.keys(passedOptionCommands).length).toBe(
                numberOfDefaultCommands,
            );
        });
        it('should return 3 custom commands with function after disabled default command and passed custom commands', () => {
            const commands = createCommands(
                {
                    ui: () => 'ui',
                    ux: () => 'ux',
                    wendy: () => 'wendy',
                },
                {
                    disableDefaultCommand: true,
                },
            );
            expect(
                Object.keys(commands).every(
                    (value) => typeof commands[value] === 'function',
                ),
            ).toBe(true);
            expect(Object.keys(commands).length).toBe(3);
        });
        it('should return 3 custom commands and 5 default functions with function after passed custom commands', () => {
            const commands = createCommands(
                {
                    ui: () => 'ui',
                    ux: () => 'ux',
                    wendy: () => 'wendy',
                },
                {
                    disableDefaultCommand: false,
                },
            );
            expect(
                Object.keys(commands).every(
                    (value) => typeof commands[value] === 'function',
                ),
            ).toBe(true);
            expect(Object.keys(commands).length).toBe(
                3 + numberOfDefaultCommands,
            );
        });
    });

export default testDefaultCommand;
