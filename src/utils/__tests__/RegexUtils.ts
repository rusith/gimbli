import {RegexUtils} from "../concrete/RegexUtils";

describe("RegexUtils.matchMultiple", () => {
    test("Should match multiple matches", () => {
        const utils = new RegexUtils();
        const text = " ab  ab ab";
        const regex = /ab/;
        const matches = utils.matchMultiple(regex, text);
        expect(matches.length).toBe(3);
        matches.forEach((m) => expect(m.content).toBe("ab"));
    });
});
