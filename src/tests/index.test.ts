/**
 * @info main test file
 */
import { before, after, describe, it } from "mocha";
import appRoot from "app-root-path";
import { writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { expect } from "chai";
import { init, keys } from "../app";

describe("with defaults testing", () => {
    describe("+ve tests", () => {
        // config data
        const configFileData = {
            400: ["error1", "error101"],
            500: ["internal1", "internal201"],
        };

        before(() => {
            // write config file to root
            writeFileSync(
                resolve(appRoot.path, "error.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
            // initialize
            init();
        });

        // contain 4 keys
        it("expect module to contain 4 keys", function () {
            expect(Object.keys(keys())).to.have.lengthOf(4);
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });
});
