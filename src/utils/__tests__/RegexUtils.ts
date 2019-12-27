import {RegexUtils} from "../concrete/RegexUtils";

describe("RegexUtils.matchMultiple", () => {
    test("Should match multiple matches - content should be correct", () => {
        const utils = new RegexUtils();
        const text = " ab  abc abcdef";
        const regex = /ab\w*/;
        const matches = utils.matchMultiple(regex, text);
        expect(matches.length).toBe(3);
        matches.forEach((m, i) => {
            if (i === 0) {
                expect(m.content).toBe("ab");
            } else if (i === 1) {
                expect(m.content).toBe("abc");
            } else if (i === 2) {
                expect(m.content).toBe("abcdef");
            }
        });
    });

    test("Should match multiple matches - ends should be correct", () => {
        const utils = new RegexUtils();
        const text = " ab  ab ab";
        const regex = /ab/;
        const matches = utils.matchMultiple(regex, text);
        expect(matches.length).toBe(3);
        matches.forEach((m, i) => {
            if (i === 0) {
                expect(m.end).toBe(3);
            } else if (i === 1) {
                expect(m.end).toBe(7);
            } else if (i === 2) {
                expect(m.end).toBe(10);
            }
        });
    });

    test("Should match multiple matches - starts should be correct", () => {
        const utils = new RegexUtils();
        const text = " ab  ab ab";
        const regex = /ab/;
        const matches = utils.matchMultiple(regex, text);
        expect(matches.length).toBe(3);
        matches.forEach((m, i) => {
            if (i === 0) {
                expect(m.start).toBe(1);
            } else if (i === 1) {
                expect(m.start).toBe(5);
            } else if (i === 2) {
                expect(m.start).toBe(8);
            }
        });
    });
});
