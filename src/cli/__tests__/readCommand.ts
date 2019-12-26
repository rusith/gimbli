import { readInputAsCommand } from "../readCommand";

describe("Reading Command", () => {
    test("Should read the first input as Type ", () => {
        function testInput(inputs: string[]){
            const command = readInputAsCommand(inputs);
            expect(command.type).toBe(inputs[0]);
        }
        
        testInput(["component"]);
        testInput(["item"])
    });
});
