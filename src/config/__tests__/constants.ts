import {specialArguments} from "../constants";

describe("specialArguments.isOne", () => {
    test("Should return false if not present", () => {
        expect(specialArguments.isOne("a")).toBeFalsy();
    });

    test("Should return true if present", () => {
        expect(specialArguments.isOne("templateDir")).toBeTruthy();
    });

    test("Should be able to handle if the value is different", () => {
        const a = {...specialArguments} as any;
        a.test = "testArg";
        expect(a.isOne("testArg")).toBeTruthy();
    });
});
