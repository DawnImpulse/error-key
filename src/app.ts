/**
 * @info default entry point
 */
import { get } from "config";
import Mapping from "./utils/mapping";

const mapping = new Mapping();

/**
 * initialize error key module
 * @param name - (not required) if provided a different key name in config file
 * @throws Error - in case config not provided
 */
export function init(name: string = "error-keys") {
    const map = get(name);
    if (!map) throw new Error("configuration object/file not provided");
    if (typeof map !== "object")
        throw new Error("configuration must be an object");
    // #todo generate internal key/value pairs
}

/**
 * used to generate unique id
 * you need to pass a unique name to this function
 * so it can create a map of unique ids -> name
 * which can be referenced later on (for debugging, referencing etc)
 * @param name - generate unique id for corresponding name
 */
export function genId(name: string) {}
