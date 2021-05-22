/**
 * @info use to check validation of different things
 */
import Generate from "./generate";
import typeOf from "./typeOf";
import constant from "./constant";

export default class Validations {
    // valid first level keys
    private readonly oValidKeys = [
        ...Generate.values(400, 431),
        440,
        444,
        ...Generate.values(449, 451),
        460,
        463,
        ...Generate.values(494, 511),
        ...Generate.values(521, 527),
        529,
        530,
        561,
        598,
    ];
    private readonly validKeys: string[];
    private keys: string[] = [];

    /**
     * init valid keys with extra error codes if any
     * @constructor
     * @param extraCodes
     */
    constructor(extraCodes: number[]) {
        this.oValidKeys = this.oValidKeys.concat(extraCodes);
        this.validKeys = this.oValidKeys.map(String);
    }

    /**
     * validate configuration file
     */
    config(config: object) {
        const keys = Object.keys(config);
        keys.forEach((key) => {
            // check if key is valid (exists in valid keys)
            if (!this.validKeys.includes(key))
                throw new Error(
                    `invalid key '${key}' ; kindly provide a valid key (read error-key docs for help)`,
                );
            // check if value of key is an array | object
            if (
                !(
                    typeOf(config[key]) === constant.ARRAY ||
                    typeOf(config[key]) === constant.OBJECT
                )
            )
                throw new Error(
                    `invalid data in key '${key}' ; must be an array/object`,
                );
            // if array, check if all keys are only string
            if (typeOf(config[key]) === constant.ARRAY)
                if (!config[key].every((i) => typeOf(i) === constant.STRING))
                    throw new Error(
                        "invalid data values ; array must contain only string values",
                    );

            // if array, insert all array keys in top level array
            if (typeOf(config[key]) === constant.ARRAY)
                this.keys = this.keys.concat(config[key]);
            else this.keys = this.keys.concat(Object.keys(config[key]));
            // if object, insert all object keys in top level array
        });
        return this;
    }

    /**
     * check if all 2nd level key names are all unique
     */
    unique() {
        const findDuplicates = (arr) =>
            arr.filter((item, index) => arr.indexOf(item) != index);
        const set = new Set(findDuplicates(this.keys));
        const dup = Array.from(set.keys());
        if (dup.length !== 0) throw new Error(`duplicate keys found - ${dup}`);
    }
}
