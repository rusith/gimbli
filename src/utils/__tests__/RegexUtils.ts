import {matchMultiple, replace} from "../regexUtils";

describe("RegexUtils.matchMultiple", () => {
    test("Should match multiple matches - content should be correct", () => {
        const text = " ab  abc abcdef";
        const regex = /ab\w*/;
        const matches = matchMultiple(regex, text);
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
        const text = " ab  ab ab";
        const regex = /ab/;
        const matches = matchMultiple(regex, text);
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
        const text = " ab  ab ab";
        const regex = /ab/;
        const matches = matchMultiple(regex, text);
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

describe("RegexUtils.replace", () => {
    test("Should replace all occurrences", () => {
        const str = "Lorem ipsumbla dolor sit ametbla, consectetur adipiscingbla elit. Nunc non.";
        const result = replace(str, "bla", "");
        expect(result).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non.");
    });
});
