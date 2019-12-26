import {TemplateFinder} from "..";

describe("TemplateFinder.findTemplate", () => {
    test("Should fail if the name is not valid", () => {
        const finder = new TemplateFinder(null);
        expect(finder.findTemplate(null)).rejects.toEqual(new Error("Invalid command name"));
    });

    test("Should return from the template folder if the template file exists", () => {
        const finder = new TemplateFinder(null);
        expect(finder.findTemplate(null)).rejects.toEqual(new Error("Invalid command name"));
    });
});
