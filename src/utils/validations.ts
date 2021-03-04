/**
 * @info use to check validation of different things
 */
import Generate from "./generate";
import typeOf from "./typeOf";
import constant from "./constant";

export default class Validations {
    // valid first level keys
    readonly oValidKeys = [
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
    readonly validKeys: string[];

    /**
     * init valid keys with extra error codes if any
     * @constructor
     * @param extraCodes
     */
    constructor(extraCodes: [number]) {
        this.oValidKeys.concat(extraCodes);
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
            // check if value of key is an array
            if (!typeOf(config[key] === constant.ARRAY))
                throw new Error(
                    `invalid data in key '${key}' ; must be an array`,
                );
        });
    }
}
