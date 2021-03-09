/**
 * @info main test file
 */
import { before, beforeEach, afterEach, after, describe, it } from "mocha";
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
                    400: { error1: 1011, error101: 1012 },
                    500: { internal1: 1021, internal201: 1022 },
                });
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });

    describe("-ve tests", () => {
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
            // not contain 3 keys
            it("expect keys fn to not return 3 keys", function () {
                expect(Object.keys(keys())).to.not.have.lengthOf(3);
            });

            // not contain different keys
            it("expect to not return different keys", function () {
                const originalKeys = [
                    "error2",
                    "error201",
                    "internal3",
                    "internal301",
                ];
                expect(Object.keys(keys())).to.not.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to not match", function () {
                const values = [4001012, 4001013, 5001024, 5001025];
                expect(Object.values(keys())).to.not.eql(values);
            });
        });

        // map function
        describe("map", () => {
            let map1;

            before(() => {
                map1 = map();
            });

            // map should match expected
            it("expect map to not match", function () {
                expect(map1).to.not.eql({
                    401: { error1: 4001011, error101: 4001012 },
                    502: { internal1: 5001021, internal201: 5001022 },
                });
            });

            it("expect map to not have different prop keys", function () {
                expect(map1).to.not.have.property("a");
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });
});

describe("with extra codes", () => {
    describe("+ve tests", () => {
        // config data
        const configFileData = {
            777: ["error1", "error101"],
            888: ["internal1", "internal201"],
            999: ["internal3"],
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
            init([777, 888, 999]);
        });

        // keys functions
        describe("keys", () => {
            // contain 4 keys
            it("expect keys fn to return 5 keys", function () {
                expect(Object.keys(keys())).to.have.lengthOf(5);
            });

            // contain same keys as given
            it("expect to return same keys", function () {
                const originalKeys = [
                    "error1",
                    "error101",
                    "internal1",
                    "internal201",
                    "internal3",
                ];
                expect(Object.keys(keys())).to.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to match", function () {
                const values = [7771011, 7771012, 8881021, 8881022, 9991031];
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
                    777: { error1: 1011, error101: 1012 },
                    888: { internal1: 1021, internal201: 1022 },
                    999: { internal3: 1031 },
                });
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });

    describe("-ve tests", () => {
        // config data
        const configFileData = {
            777: ["error1", "error101"],
            888: ["internal1", "internal201"],
            999: ["internal3"],
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
            init([777, 888, 999]);
        });

        // keys functions
        describe("keys", () => {
            // not contain 4 keys
            it("expect keys fn to not return 4 keys", function () {
                expect(Object.keys(keys())).to.not.have.lengthOf(4);
            });

            // not contain different keys
            it("expect to not return different keys", function () {
                const originalKeys = [
                    "error2",
                    "error201",
                    "internal3",
                    "internal301",
                ];
                expect(Object.keys(keys())).to.not.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to not match", function () {
                const values = [4001012, 4001013, 5001024, 5001025];
                expect(Object.values(keys())).to.not.eql(values);
            });
        });

        // map function
        describe("map", () => {
            let map1;

            before(() => {
                map1 = map();
            });

            // map should match expected
            it("expect map to not match", function () {
                expect(map1).to.not.eql({
                    401: { error1: 4001011, error101: 4001012 },
                    502: { internal1: 5001021, internal201: 5001022 },
                });
            });

            it("expect map to not have different prop keys", function () {
                expect(map1).to.not.have.property("a");
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });
});

describe("with diff file name", () => {
    describe("+ve tests", () => {
        // config data
        const configFileData = {
            666: ["error1", "error2"],
            888: ["error3"],
        };

        before(() => {
            // write config file to root
            writeFileSync(
                resolve(appRoot.path, "error.key.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
            // initialize
            init([666, 888], "error.key.config.json");
        });

        // keys functions
        describe("keys", () => {
            // contain 4 keys
            it("expect keys fn to return 3 keys", function () {
                expect(Object.keys(keys())).to.have.lengthOf(3);
            });

            // contain same keys as given
            it("expect to return same keys", function () {
                const originalKeys = ["error1", "error2", "error3"];
                expect(Object.keys(keys())).to.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to match", function () {
                const values = [6661011, 6661012, 8881021];
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
                    666: { error1: 1011, error2: 1012 },
                    888: { error3: 1021 },
                });
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.key.config.json"));
        });
    });

    describe("-ve tests", () => {
        // config data
        const configFileData = {
            666: ["error1", "error2"],
            888: ["error3"],
        };

        before(() => {
            // write config file to root
            writeFileSync(
                resolve(appRoot.path, "error.key.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
            // initialize
            init([666, 888], "error.key.config.json");
        });

        // keys functions
        describe("keys", () => {
            // not contain 4 keys
            it("expect keys fn to not return 2 keys", function () {
                expect(Object.keys(keys())).to.not.have.lengthOf(2);
            });

            // not contain different keys
            it("expect to not return different keys", function () {
                const originalKeys = ["error5", "error6", "error7"];
                expect(Object.keys(keys())).to.not.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to not match", function () {
                const values = [4001012, 4001013, 5001024];
                expect(Object.values(keys())).to.not.eql(values);
            });
        });

        // map function
        describe("map", () => {
            let map1;

            before(() => {
                map1 = map();
            });

            // map should match expected
            it("expect map to not match", function () {
                expect(map1).to.not.eql({
                    401: { error1: 4001011, error101: 4001012 },
                    502: { internal1: 5001021, internal201: 5001022 },
                });
            });

            it("expect map to not have different prop keys", function () {
                expect(map1).to.not.have.property("d1");
            });
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.key.config.json"));
        });
    });
});

describe("invalid cases", () => {
    // invalid key
    describe("invalid key", () => {
        before(() => {
            // config data
            const configFileData = {
                777: ["error1"],
            };

            writeFileSync(
                resolve(appRoot.path, "error.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
        });

        it("expect to throw invalid key", function () {
            expect(init).to.throw(
                Error,
                "invalid key '777' ; kindly provide a valid key (read error-key docs for help)",
            );
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });

    // invalid data
    describe("invalid data", () => {
        before(() => {
            const configFileData = {
                400: {},
            };

            writeFileSync(
                resolve(appRoot.path, "error.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
        });

        it("expect to throw invalid data", function () {
            expect(init).to.throw(
                Error,
                "invalid data in key '400' ; must be an array",
            );
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });

    // invalid array value
    describe("invalid value", () => {
        before(() => {
            const configFileData = {
                400: [0, 2],
            };

            writeFileSync(
                resolve(appRoot.path, "error.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
        });

        it("expect to throw invalid data", function () {
            expect(init).to.throw(
                Error,
                "invalid data values ; array must contain only string values",
            );
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });

    // duplicate keys
    describe("duplicate keys", () => {
        before(() => {
            const configFileData = {
                400: ["error1"],
                500: ["error2", "error1"],
            };

            writeFileSync(
                resolve(appRoot.path, "error.config.json"),
                JSON.stringify(configFileData, null, 4),
                {
                    encoding: "utf-8",
                },
            );
        });

        it("expect to throw duplicate keys", function () {
            expect(init).to.throw(Error, "duplicate keys found - error1");
        });

        // delete config file from root
        after(() => {
            unlinkSync(resolve(appRoot.path, "error.config.json"));
        });
    });
});
