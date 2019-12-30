/* tslint:disable:no-trailing-whitespace */
import {ITemplate} from "../../models";
import {findArgSection, findFileSections, objectify} from "../objectifier";

describe("objectifier.findFileSections", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})#@
${content}
@#@
        k`;
            const result = findFileSections(text);
            expect(result.length).toBe(1);
            expect(result[0].config).toBe(config);
            expect(result[0].content).toBe(`\n${content}\n`);
        }

        testContent("content one", "config one");
        testContent("content two", "config two");
    });

    test("Should identify multiple file correctly", () => {
        const text = `
@#file(configOne)#@
contentOne
@#@

@#file(configTwo)#@
contentTwo
@#@
        k`;

        const result = findFileSections(text);
        expect(result.length).toBe(2);
        expect(result[0].config).toBe("configOne");
        expect(result[0].content).toBe(`\ncontentOne\n`);

        expect(result[1].config).toBe("configTwo");
        expect(result[1].content).toBe(`\ncontentTwo\n`);
    });
    
    test("Should return an empty list is there are no sections", () => {

        const text = `
@#args#@
contentOne
@#@
        k`;
        
        const result = findFileSections(text);
        expect(result.length).toBe(0);
    });
});

describe("objectifier.objectify", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})#@
${content}
@#@
        k`;
            const template: ITemplate = {
                command: null,
                content: text,
                file: null,
                name: "test",
                path: "",
            };
            const result = objectify(template);
            expect(result.files.length).toBe(1);
            expect(result.files[0].config).toBe(config);
            expect(result.files[0].content).toBe(`\n${content}\n`);
            expect(result.template).toBe(template);
        }

        testContent("content one", "config one");
        testContent("content two", "config two");
    });

    test("Should return the template instance", () => {

        const template: ITemplate = {
            command: null,
            content: "",
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.template).toBe(template);
    });

    test("definition should return the args", () => {

        const template: ITemplate = {
            command: {
                args: [
                    {
                        name: "key",
                        value: "keyOne",
                    },
                    {
                        name: "somethingElse",
                        value: true,
                    },
                ],
                path: null,
                type: null,
            },
            content: `
@# args #@
key
component name
Some other thing
somethingElse
@#@
            `,
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.args.length).toBe(2);
        expect(result.args[0].name).toBe("key");
        expect(result.args[0].value).toBe("keyOne");

        expect(result.args[1].name).toBe("somethingElse");
        expect(result.args[1].value).toBe(true);
    });
});

describe("objectifier.findArgSection", () => {
    test("Should identify a the section", () => {
        const content = `
@# args #@
test
@#@
`;
        const result = findArgSection(content);
        expect(result.arguments[0]).toBe("test");
    });
    test("Should return empty list if the section is empty", () => {
        const content = `
@# args #@@#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Should return empty list if the section is only white spaces", () => {
        const content = `
@# args #@  @#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Should return empty list if the section is only white spaces with newline", () => {
        const content = `
@# args #@
  
    


@#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Arguments should be words", () => {
        const content = `
@# args #@
key
component name
Some other thing
somethingElse
@#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(4);
        expect(result.arguments[0]).toBe("key");
        expect(result.arguments[1]).toBe("component");
        expect(result.arguments[2]).toBe("Some");
        expect(result.arguments[3]).toBe("somethingElse");
    });
});
