import {mapMocks} from "../mocking";

describe("mapMocks", () => {
    test("If a single key provided, should call the setter", () => {
        const func = () => { /**/ };
        const newFn = () => false;
        const setter = jest.fn(() => { /**/ }) as any;
        const mapper = mapMocks([[ func, (...args) => setter(...args)]]);
        mapper(func, newFn);
        expect(setter).toBeCalledWith(newFn);
    });

    test("Multiple keys should be handled correctly", () => {
        const func = () => { /**/ };
        const newFn = () => false;
        const func1 = () => { /**/ };
        const newFn1 = () => false;
        const setter = jest.fn(() => { /**/ }) as any;
        const setter1 = jest.fn(() => { /**/ }) as any;
        const mapper = mapMocks([[ func, (...args) => setter(...args)], [ func1, (...args) => setter1(...args)]]);
        mapper(func, newFn);
        expect(setter).toBeCalledWith(newFn);
        mapper(func1, newFn1);
        expect(setter1).toBeCalledWith(newFn1);
    });

    test("Should not throw if the key is not there", () => {
        const func = () => { /**/ };
        const newFn = () => false;
        const setter = jest.fn(() => { /**/ }) as any;
        const mapper = mapMocks([[ () => { /**/ }, (...args) => setter(...args)]]);
        expect(() => mapper(func, newFn)).not.toThrow();
    });
});
