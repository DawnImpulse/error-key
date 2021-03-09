/**
 * @info use for mapping of unique names to ids
 */

export default class Mapping {
    private readonly map: object;
    private readonly keys: object;
    private objKey: number = 100;

    /**
     * @constructor
     * @param config
     */
    constructor(config: object) {
        this.map = {};
        this.keys = {};
        this.parse(config);
    }

    /**
     * parse configuration object to map
     * we will append parent key (error code) name with unique value
     * eg 4011001 - here 401 is error code, 100 is obj key & 1 is error key
     * externally 1001 will be returned as error key
     * @param config - configuration object
     * @private
     */
    private parse(config: object) {
        Object.keys(config).forEach((key) => {
            this.map[key] = {};
            const oid = ++this.objKey;
            let eid = 0;
            config[key].forEach((el) => {
                this.map[key][el] = Number(`${oid}${++eid}`);
                this.keys[el] = Number(`${key}${oid}${eid}`);
            });
        });
    }

    /**
     * get all unique key values object
     */
    keyValues(): object {
        return this.keys;
    }

    /**
     * get complete key/value map
     */
    getMap(): object {
        return this.map;
    }
}
