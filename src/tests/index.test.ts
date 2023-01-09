/**
 * @info main test file
 */
import { before, describe, it } from "mocha";
import { expect } from "chai";
import { codes, initErrors, keys, map } from "../app";

describe("with defaults testing", () => {
    describe("+ve tests", () => {
        // config data
        const configFileData = {
            400: ["error1", "error101"],
            500: ["internal1", "internal201"],
        };

        before(() => {
            // initialize
            initErrors([], configFileData);
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

        // codes function
        describe("code", () => {
            let code;

            before(() => {
                code = codes(4001001);
            });

            // expect it to contain status & error code
            it("expect it to contain status & error code", function () {
                expect(code).to.have.property("status");
                expect(code).to.have.property("error");
            });

            // expect status code to be 400
            it("expect status code to be 400", function () {
                expect(code).to.include({
                    status: 400,
                });
            });

            // expect error code to be 1001
            it("expect error code to be 1001", function () {
                expect(code).to.include({
                    error: 1001,
                });
            });
        });
    });

    describe("-ve tests", () => {
        // config data
        const configFileData = {
            400: ["error1", "error101"],
            500: ["internal1", "internal201"],
        };

        before(() => {
            // initialize
            initErrors([], configFileData);
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

        // codes function
        describe("code", () => {
            // expect to throw invalid errorCode
            it("expect to throw invalid errorCode", function () {
                function fn() {
                    return codes(500);
                }
                expect(fn).to.throw(Error, "invalid errorCode '500'");
            });
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
            // initialize
            initErrors([777, 888, 999], configFileData);
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
    });

    describe("-ve tests", () => {
        // config data
        const configFileData = {
            777: ["error1", "error101"],
            888: ["internal1", "internal201"],
            999: ["internal3"],
        };

        before(() => {
            // initialize
            initErrors([777, 888, 999], configFileData);
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
    });
});

describe("invalid cases", () => {
    // invalid key
    describe("invalid key", () => {
        it("expect to throw invalid key", function () {
            // config data
            const configFileData = {
                777: ["error1"],
            };

            function fn() {
                initErrors([], configFileData);
            }

            expect(fn).to.throw(
                Error,
                "invalid key '777' ; kindly provide a valid key (read error-key docs for help)",
            );
        });
    });

    // key not a number
    describe("key not a number", () => {
        it("expect to throw invalid key", function () {
            function fn() {
                // @ts-ignore
                initErrors(["hello"], {});
            }
            expect(fn).to.throw(Error, "hello is not a number");
        });
    });

    // key not in range
    describe("key not in range", () => {
        it("expect to throw invalid key", function () {
            function fn() {
                initErrors([1013], {
                    1013: ["error1"],
                });
            }
            expect(fn).to.throw(Error, "custom status code must be < 1000");
        });
    });

    // invalid data
    describe("invalid data", () => {
        it("expect to throw invalid data", function () {
            function fn() {
                initErrors([], {
                    400: "string",
                });
            }

            expect(fn).to.throw(
                Error,
                "invalid data in key '400' ; must be an array",
            );
        });
    });

    // invalid array value
    describe("invalid value", () => {
        it("expect to throw invalid data", function () {
            function fn() {
                initErrors([], {
                    400: [0, 2],
                });
            }

            expect(fn).to.throw(
                Error,
                "invalid data values ; array must contain only string values",
            );
        });
    });

    // duplicate keys
    describe("duplicate keys", () => {
        it("expect to throw duplicate keys", function () {
            function fn() {
                initErrors([], {
                    400: ["error1"],
                    500: ["error2", "error1"],
                });
            }
            expect(fn).to.throw(Error, "duplicate keys found - error1");
        });
    });
});

describe("with data object", () => {
    describe("with general data", () => {
        before(() => {
            // config data
            const configFileData = {
                400: { error1: "" },
                500: ["internal1"],
            };

            // initialize
            initErrors([], configFileData);
        });

        // keys functions
        describe("keys", () => {
            // contain 4 keys
            it("expect keys fn to return 2 keys", function () {
                expect(Object.keys(keys())).to.have.lengthOf(2);
            });

            // contain same keys as given
            it("expect to return same keys", function () {
                const originalKeys = ["error1", "internal1"];
                expect(Object.keys(keys())).to.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to match", function () {
                const values = [4001011, 5001021];
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
                    400: { error1: 1011 },
                    500: { internal1: 1021 },
                });
            });
        });
    });

    describe("with extra codes", () => {
        before(() => {
            // config data
            const configFileData = {
                400: ["error1", "error101"],
                500: ["internal1", "internal201"],
                999: ["something"],
            };

            // initialize
            initErrors([999], configFileData);
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
                    "something",
                ];
                expect(Object.keys(keys())).to.eql(originalKeys);
            });

            // key value should match expected result
            it("expect values to match", function () {
                const values = [4001011, 4001012, 5001021, 5001022, 9991031];
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
                    999: { something: 1031 },
                });
            });
        });
    });
});
