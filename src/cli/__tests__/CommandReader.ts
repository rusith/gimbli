import {CommandReader} from "..";

describe("CommandReader.read", () => {
    const commandReader = new CommandReader();
    test("Should read the first input as Type ", () => {
        function testInput(inputs: string[]) {
            const command = commandReader.read(inputs);
            expect(command.type).toBe(inputs[0]);
        }

        testInput(["component"]);
        testInput(["item"]);
    });
});
