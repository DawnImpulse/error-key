/**
 * @info
 */
export default class Generate {
    /**
     * return array of values between two numbers (including)
     * @param fromNumber
     * @param toNumber
     */
    static values(fromNumber: number, toNumber: number): number[] {
        const list: number[] = [];
        for (let i = fromNumber; i <= toNumber; i++) list.push(i);
        return list;
    }
}
