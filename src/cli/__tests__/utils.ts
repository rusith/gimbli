import {getRelevantArguments} from "../utils";

describe("Cli Utils", () => {
    test("Get arguments should return empty if input is empty", () => {
        const result = getRelevantArguments([]);
        expect(result.length).toBe(0);
    });

    test("Get arguments should return empty if input is null", () => {
        const result = getRelevantArguments(null);
        expect(result.length).toBe(0);
    });

    test("Get arguments should return empty list if input length is two", () => {
        let result = getRelevantArguments(["a", "b"]);
        expect(result.length).toBe(0);
    });


    test("Get arguments should return last item if input length is 3", () => {
        const result = getRelevantArguments(["a", "b", "c"]);
        expect(result.length).toBe(1);
        expect(result[0]).toBe("c");
    });
    
    test("Get arguments should return last items if input length is more than 3 long", () => {
        const result = getRelevantArguments(["a", "b", "c", "d"]);
        expect(result.length).toBe(2);
        expect(result[0]).toBe("c");
        expect(result[1]).toBe("d");
    });
});
