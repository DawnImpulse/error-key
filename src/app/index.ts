/**
 * @info default entry point
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import Mapping from "./utils/mapping";
import appRoot from "app-root-path";
import Validations from "./utils/validations";
import typeOf from "./utils/typeOf";
import { types } from "util";

let mapping: Mapping;
let validations: Validations;

/**
 * initialize error key module
 * @param name - (not required) if provided a different name of file
 * @param extraCodes - (not required) if need to provide different error codes
 * @throws Error - any config related issues
 */
export function init(
    extraCodes: number[] = [],
    name: string = "error.config.json",
) {
    // custom errorCode should be < 1000
    extraCodes.forEach((el) => {
        if (typeof el !== "number") throw new Error(`${el} is not a number`);
        if (el >= 1000) throw new Error(`custom status code must be < 1000`);
    });
    // read config file
    const map = readFileSync(resolve(appRoot.path, name), "utf-8");
    // validate config file
    validations = new Validations(extraCodes);
    validations.config(JSON.parse(map)).unique();
    // creating internal mappings
    mapping = new Mapping(JSON.parse(map));
}

/**
 * get all unique keys with values
 */
export function keys(): object {
    return mapping.keyValues();
}

/**
 * get complete json mapping (with values)
 */
export function map(): object {
    return mapping.getMap();
}

// todo - custom errorCode should be < 1000
// todo - parsing statusCode from errorCode
