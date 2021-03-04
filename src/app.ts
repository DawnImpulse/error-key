/**
 * @info default entry point
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import Mapping from "./utils/mapping";
import rootPath from "app-root-path";
import typeOf from "./utils/typeOf";
import constant from "./utils/constant";

let mapping: Mapping;

/**
 * initialize error key module
 * @param name - (not required) if provided a different key name in config file
 * @throws Error - in case config not provided
 */
export function init(name: string = "error-keys") {
    // read config file
    const map = readFileSync(resolve(rootPath, "error.config.json"), "utf-8");
    // creating internal mappings
    mapping = new Mapping(JSON.parse(map));
}

/**
 * used to generate unique id
 * you need to pass a unique name to this function
 * so it can create a map of unique ids -> name
 * which can be referenced later on (for debugging, referencing etc)
 * @param name - generate unique id for corresponding name
 */
export function genId(name: string) {}
