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
     * @param config - configuration object
     * @param key - mapping key
     * @param num - mapping number
     * @private
     */
    private parse(config: object, key: string = "", num: number = 0) {
        let number = num;
        Object.keys(config).forEach((el) => {
            switch (config[el]) {
                // array
                case constant.ARRAY:
                    throw new Error(
                        "configuration should not contain array in any key",
                    );
                // object
                case constant.OBJECT:
                    this.parse(config[el], this.key(key, el), number);
                    break;
                // assign unique mapping number
                default:
                    this.map[this.key(key, el)] = ++number;
            }
        });
    }
}
