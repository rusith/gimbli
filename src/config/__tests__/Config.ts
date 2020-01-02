import {Config} from "../../models/Config";

describe("Config", () => {
    test("templateDir should be templates", () => {
        const config = new Config();
        expect(config.templateDir).toBe("./templates");
    });
});
