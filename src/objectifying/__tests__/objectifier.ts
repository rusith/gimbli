/* tslint:disable:no-trailing-whitespace */
import {ITemplate} from "../../models";
import {findArgSection, findFileSections, findIfForFileSection, findIfs, objectify} from "../objectifier";

describe("findFileSections", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})
${content}
#@
        k`;
            const result = findFileSections(text);
            expect(result.length).toBe(1);
            expect(result[0].config).toBe(config);
            expect(result[0].content).toBe(`${content}\n`);
            expect(result[0].start).toBe(1);
        }

        testContent("content one", "config one");
        testContent("content two", "config two");
    });

    test("Should identify multiple file correctly", () => {
        const text = `
@#file(configOne)
contentOne
#@

@#file(configTwo)
contentTwo
#@
        k`;

        const result = findFileSections(text);
        expect(result.length).toBe(2);
        expect(result[0].config).toBe("configOne");
        expect(result[0].content).toBe(`contentOne\n`);

        expect(result[1].config).toBe("configTwo");
        expect(result[1].content).toBe(`contentTwo\n`);
    });
    
    test("Should return an empty list is there are no sections", () => {

        const text = `
@#args
contentOne
#@
        k`;
        
        const result = findFileSections(text);
        expect(result.length).toBe(0);
    });

    test("Should handle arbitrary spaces", () => {
        const text = `
@# file   (  configOne  )
contentOne
#@

        k`;

        const result = findFileSections(text);
        expect(result.length).toBe(1);
        expect(result[0].config).toBe("  configOne  ");
        expect(result[0].content).toBe("contentOne\n");
        
    });

    test("Starting EOL should be removed from the content", () => {
        const text = `
@# file   (  configOne  )
contentOne
#@

        k`;

        const result = findFileSections(text);
        expect(result[0].content).toBe("contentOne\n");
    });

    test("Starting EOL should be removed from the content - when content is multiline", () => {
        const text = `
@# file   (  configOne  )
abc
def
contentOne
#@

        k`;

        const result = findFileSections(text);
        expect(result[0].content).toBe("abc\ndef\ncontentOne\n");
    });

    test("Deliberate spaces in the start should be perceived", () => {
        const text = `
@# file   (  configOne  )
  abc
def
contentOne
#@

        k`;

        const result = findFileSections(text);
        expect(result[0].content).toBe("  abc\ndef\ncontentOne\n");
    });

    test("Should not fail if content doesn't have new lines", () => {
        const text = `
@# file   (  configOne  )  contentOne  #@

        k`;

        const result = findFileSections(text);
        expect(result[0].content).toBe("  contentOne  ");
    });

    test("Last end of section before end of file should be taken as the end of section", () => {
        const content = `
@#file($name.txt)
#@
#@
`;
        const fileSections = findFileSections(content);
        expect(fileSections[0].content).toBe("#@\n");
    });

    test("Last end of section before next section should be taken as the end of section", () => {
        const content = `
@#file($name.txt)
#@
#@
@#file($name.css)
#@
`;
        const fileSections = findFileSections(content);
        expect(fileSections.length).toBe(2);
        expect(fileSections[0].content).toBe("#@\n");
    });

    test("Should be able to handle big content with end of section inside", () => {
        const content = `
@#file($name.txt)

        const fileSections = findFileSections(content);
        expect(fileSections.length).toBe(2);
        expect(fileSections[0].content).toBe("#@\n");
    });

    test("Should be able to handle big content with end of section inside", () => {
        const content = \`
#@
#@
@#file($name.css)
content
#@
content
#@
`;
        const fileSections = findFileSections(content);
        expect(fileSections.length).toBe(2);
        expect(fileSections[0].content).toBe(`
        const fileSections = findFileSections(content);
        expect(fileSections.length).toBe(2);
        expect(fileSections[0].content).toBe("#@
");
    });

    test("Should be able to handle big content with end of section inside", () => {
        const content = \`
#@\n`);

        expect(fileSections[1].content).toBe(`content
#@
content\n`);
    });

    test("Should throw if there are no matching endings", () => {
        const content = `
@#file($name.txt)
some content
`;
        expect(() => findFileSections(content)).toThrowError(`Syntax Error! No ending found for the file section at line 1`);
    });
});

describe("objectify", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})
${content}
#@
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
            expect(result.files[0].content).toBe(`${content}\n`);
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
                specialArgs: [],
                type: null,
            },
            content: `
@# args 
key
somethingElse
#@
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

    test("Default values for arguments should be false", () => {

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
                specialArgs: [],
                type: null,
            },
            content: `
@# args 
key
component name
Some other thing
somethingElse
#@
            `,
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.args.length).toBe(4);
        expect(result.args[0].name).toBe("key");
        expect(result.args[0].value).toBe("keyOne");

        expect(result.args[1].name).toBe("component");
        expect(result.args[1].value).toBe(false);

        expect(result.args[2].name).toBe("Some");
        expect(result.args[2].value).toBe(false);

        expect(result.args[3].name).toBe("somethingElse");
        expect(result.args[3].value).toBe(true);
    });

    test("Should be able to handle arguments and files", () => {

        const template: ITemplate = {
            command: {
                args: [
                    {
                        name: "className",
                        value: "TestClass",
                    },
                ],
                path: "components/App",
                specialArgs: [],
                type: null,
            },
            content: `
@# args
className
#@

@# file($path/$name.tsx)
export default class {{className}} {

}
#@

@# file($path/$name.module.css)
.{{className}} {
    color: white;
}
#@

            `,
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.args.length).toBe(1);
        expect(result.args[0].name).toBe("className");
        expect(result.args[0].value).toBe("TestClass");

        expect(result.files[0].config).toBe("$path/$name.tsx");
        expect(result.files[0].content).toBe("export default class {{className}} {\n\n}\n");

        expect(result.files[1].config).toBe("$path/$name.module.css");
        expect(result.files[1].content).toBe(".{{className}} {\n    color: white;\n}\n");
    });

    test("Should be able to handle arguments and files when file starts at index 0", () => {
        const template: ITemplate = {
            command: {
                args: [
                    {
                        name: "className",
                        value: "TestClass",
                    },
                ],
                path: "components/App",
                specialArgs: [],
                type: null,
            },
            content: `@# args
className
#@
@# file(test.txt)
content
#@
            `,
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.args.length).toBe(1);
        expect(result.args[0].name).toBe("className");
        expect(result.args[0].value).toBe("TestClass");

        expect(result.files[0].config).toBe("test.txt");
        expect(result.files[0].content).toBe("content\n");
    });

    test("Result should include ifs", () => {
        const template: ITemplate = {
            command: {
                args: [
                    {
                        name: "className",
                        value: "TestClass",
                    },
                ],
                path: "components/App",
                specialArgs: [],
                type: null,
            },
            content: `@# args
className
#@
@# if(ifContent)
@# file(test.txt)
content
#@
            `,
            file: null,
            name: "test",
            path: "",
        };

        const result = objectify(template);
        expect(result.args.length).toBe(1);
        expect(result.args[0].name).toBe("className");
        expect(result.args[0].value).toBe("TestClass");

        expect(result.files[0].config).toBe("test.txt");
        expect(result.files[0].content).toBe("content\n");
        expect(result.files[0].if).toBe("ifContent");
    });
});

describe("findArgSection", () => {
    test("Should identify a the section", () => {
        const content = `
@# args 
test
#@
`;
        const result = findArgSection(content);
        expect(result.arguments[0]).toBe("test");
    });
    test("Should return empty list if the section is empty", () => {
        const content = `
@# args #@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Should return empty list if the section is only white spaces", () => {
        const content = `
@# args   #@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Should return empty list if the section is only white spaces with newline", () => {
        const content = `
@# args
  
    


#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(0);
    });

    test("Arguments should be words", () => {
        const content = `
@# args
key
component name
Some other thing
somethingElse
#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(4);
        expect(result.arguments[0]).toBe("key");
        expect(result.arguments[1]).toBe("component");
        expect(result.arguments[2]).toBe("Some");
        expect(result.arguments[3]).toBe("somethingElse");
    });

    test("Should return start and end of the section", () => {
        const content = `
@# args
key
#@
`;
        const result = findArgSection(content);
        expect(result.start).toBe(1);
        expect(result.end).toBe(15);
    });

    test("Should ignore empty lines in arg definition", () => {

        const content = `
@# args
key1
  
key2
#@
`;
        const result = findArgSection(content);
        expect(result.arguments.length).toBe(2);
        expect(result.arguments[0]).toBe("key1");
        expect(result.arguments[1]).toBe("key2");
    });
});

describe("findIfs", () => {
    test("Should find if statements in the template", () => {
        const content = `
@#if(something)
@#file($name.txt)
#@
`;
        const result = findIfs(content);
        expect(result[0].content).toBe("something");
        expect(result[0].end).toBe(16);
    });

    test("Should find if statements in the template", () => {
        const content = `
@#if(something)
@#file($name.txt)
#@
`;
        const result = findIfs(content);
        expect(result[0].content).toBe("something");
        expect(result[0].end).toBe(16);
    });

    test("Should find multiple if statements in the template", () => {
        const content = `
@#if(something)
@#if(something2)
@#file($name.txt)
#@
`;
        const result = findIfs(content);
        expect(result[0].content).toBe("something");
        expect(result[0].end).toBe(16);

        expect(result[1].content).toBe("something2");
        expect(result[1].end).toBe(33);
    });
});

describe("findIfForFileSection", () => {
    test("if should be above file section", () => {
        const content = `
@#if(something2)
@#file($name.txt)
#@
`;
        const fileSection = findFileSections(content)[0];
        const ifs =  findIfs(content);
        
        const result = findIfForFileSection(content, fileSection, ifs);
        expect(result).toBe(ifs[0]);
    });

    test("if should be above file section - below file", () => {
        const content = `
@#file($name.txt)
#@
@#if(something2)
`;
        const fileSection = findFileSections(content)[0];
        const ifs =  findIfs(content);

        const result = findIfForFileSection(content, fileSection, ifs);
        expect(result).toBe(null);
    });

    test("Should identify correct if from stacked ifs", () => {
        const content = `
@#if(something2)
@#if(something3)
@#file($name.txt)
#@
`;
        const fileSection = findFileSections(content)[0];
        const ifs =  findIfs(content);

        const result = findIfForFileSection(content, fileSection, ifs);
        expect(result).toBe(ifs[1]);
    });
});
