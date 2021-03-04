/**
 * @info main test file
 */
import { before, after, describe, it } from "mocha";
import appRoot from "app-root-path";
import { writeFileSync, unlinkSync } from "fs";
import { resolve } from "path";
import { expect } from "chai";
import { init, keys, map } from "../app";

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

        // keys functions
        describe("keys", () => {
            // contain 4 keys
            it("expect keys fn to return 4 keys", function () {
                expect(Object.keys(keys())).to.have.lengthOf(4);
            });

            // contain same keys as given
            it("expect to return same keys", function () {
                const originalKeys = [
                    "error1",
                    "error101",
                    "internal1",
                    "internal201",
                ];
                expect(Object.keys(keys())).to.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to match", function () {
                const values = [4001011, 4001012, 5001021, 5001022];
                expect(Object.values(keys())).to.eql(values);
            });
        });

        // map function
        describe("map", () => {
            let map1;

            before(() => {
                map1 = map();
            });

            // map should match expected
            it("expect map to match", function () {
                expect(map1).to.eql({
                    400: { error1: 4001011, error101: 4001012 },
                    500: { internal1: 5001021, internal201: 5001022 },
                });
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });
});
