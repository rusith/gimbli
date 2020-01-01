import * as fs from "fs";
import * as path from "path";
import {run} from "../index";
jest.mock("fs");

describe("run", () => {
    test("Should call correct apis for simple template", async () => {
        const args = ["node", "./index.ts", "test", "-className", "Test"];
        (fs as any).setMockFn(fs.readdir, (p, opt, callback) => {
            if (p === path.join(process.cwd())) {
                callback(null, [
                    {
                        isDirectory: () => true,
                        name: "templates",
                    },
                ]);
            } else if (p === path.join(process.cwd(), "templates")) {
                callback(null, [
                    {
                        isFile: () => true,
                        name: "test.gimbli",
                    },
                ]);
            }
        });

        const content = `@#file($path/$name.cs)#@
content
@#@`;

        (fs as any).setMockFn(fs.readFile, (p, callback) => {
            callback(null, content);
        });

        let ok = false;

        (fs as any).setMockFn(fs.writeFile, (p, c, callback) => {
            ok = c === "content\n";
            callback(null);
        });

        await run(args);

        expect(ok).toBeTruthy();
    });
});
