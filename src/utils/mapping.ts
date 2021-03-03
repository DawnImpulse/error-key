/**
 * @info use for mapping of unique names to ids
 */
export default class Mapping {
    private map: Map<string, number>;

    constructor() {
        this.map = new Map<string, number>();
    }

    /**
     * check if given key exists in map
     * @param key
     */
    exists(key) {
        return this.map.has(key);
    }

    /**
     * insert pair to map
     * @param key
     * @param value
     */
    put(key: string, value: number) {
        if (this.exists(key))
            throw new Error(`given key '${key}' already initialized`);
        this.map.set(key, value);
    }

    /**
     * return complete map
     */
    getAll(): Map<string, number> {
        return this.map;
    }
}
