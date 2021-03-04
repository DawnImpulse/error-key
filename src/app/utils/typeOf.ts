/**
 * @info Used to check if data type is json or not
 */

import constant from "./constant";

/**
 * @param data
 * @return {string}
 */
export default function (data) {
    const objectConstructor = {}.constructor;
    const arrayConstructor = [].constructor;
    const stringConstructor = "test".constructor;
    if (data && data.constructor === objectConstructor) {
        return constant.OBJECT;
    } else if (data && data.constructor === arrayConstructor) {
        return constant.ARRAY;
    } else if (data && data.constructor === stringConstructor) {
        return constant.STRING;
    } else {
        return "";
    }
}
