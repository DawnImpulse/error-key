/**
 * @info default entry point
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import Mapping from "./utils/mapping";
import Validations from "./utils/validations";

let mapping: Mapping;
let validations: Validations;

export interface ActualCode {
    status: number;
    error: number;
}

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
    const map = readFileSync(resolve(process.env.INIT_CWD, name), "utf-8");
    // validate config file
    validations = new Validations(extraCodes);
    validations.config(JSON.parse(map)).unique();
    // creating internal mappings
    mapping = new Mapping(JSON.parse(map));
}

/**
 * get all unique keys with values
 * although the function return a key-value object
 * but returning any so if using typescript
 * @return any
 */
export function keys(): any {
    return mapping.keyValues();
}

/**
 * get complete json mapping (with values)
 */
export function map(): object {
    return mapping.getMap();
}

/**
 * return actual statusCode & error code for external output
 * @param errorCode
 * @return ActualCode
 */
export function codes(errorCode: number): ActualCode {
    // to check if given code is valid or not
    if (errorCode.toString().length < 7)
        throw new Error(`invalid errorCode '${errorCode}'`);
    // extract status code
    const status = Number(errorCode.toString().substr(0, 3));
    // extract error code
    const error = Number(errorCode.toString().substr(3));

    return {
        status,
        error,
    };
}

// todo - parsing statusCode from errorCode
