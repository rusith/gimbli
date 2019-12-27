import {Objectifier} from "..";
import {RegexUtils} from "../../utils/concrete/RegexUtils";

describe("Objectifier.findFileSections", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})@#
${content}
@#@
        k`;
            const objectifier = new Objectifier(new RegexUtils());
            const result = objectifier.findFileSections(text);
            expect(result.length).toBe(1);
            expect(result[0].config).toBe(config);
            expect(result[0].content).toBe(`\n${content}\n`);
        }

        testContent("content one", "config one");
        testContent("content two", "config two");
    });

    test("Should identify multiple file correctly", () => {
        const text = `
@#file(configOne)@#
contentOne
@#@

@#file(configTwo)@#
contentTwo
@#@
        k`;

        const objectifier = new Objectifier(new RegexUtils());
        const result = objectifier.findFileSections(text);
        expect(result.length).toBe(2);
        expect(result[0].config).toBe("configOne");
        expect(result[0].content).toBe(`\ncontentOne\n`);

        expect(result[1].config).toBe("configTwo");
        expect(result[1].content).toBe(`\ncontentTwo\n`);
    });
});

describe("Objectifier.objectify", () => {
    test("Should identify correct sections", () => {

        function testContent(content: string, config: string) {
            const text = `
@#file(${config})@#
${content}
@#@
        k`;
            const objectifier = new Objectifier(new RegexUtils());
            const result = objectifier.objectify({
                content: text,
                file: null,
                name: "test",
            });
            expect(result.files.length).toBe(1);
            expect(result.files[0].config).toBe(config);
            expect(result.files[0].content).toBe(`\n${content}\n`);
        }

        testContent("content one", "config one");
        testContent("content two", "config two");
    });
});
