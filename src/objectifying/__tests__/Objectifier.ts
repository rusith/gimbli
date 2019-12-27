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
});
