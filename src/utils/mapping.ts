/**
 * @info use for mapping of unique names to ids
 */
import constant from "./constant";

export default class Mapping {
    private readonly map: object;

    /**
     * @constructor
     * @param config
     */
    constructor(config: object) {
        this.map = {};
        this.parse(config);
    }

    /**
     * create key
     * @param prevKey
     * @param newKey
     * @private
     */
    private key(prevKey, newKey) {
        if (prevKey === "") return newKey;
        return `${newKey}.${newKey}`;
    }

    /**
     * parse configuration object to map
     * @param config
     * @param key
     * @private
     */
    private parse(config: object, key: string = "") {
        Object.keys(config).forEach((el) => {
            switch (config[el]) {
                // array
                case constant.ARRAY:
                    throw new Error(
                        "configuration should not contain array in any key",
                    );
                // object
                case constant.OBJECT:
                    this.parse(config[el], this.key(key, el));
                    break;
                default:
                    // #todo unique number
                    this.map[this.key(key, el)] = 0;
            }
        });
    }
}
