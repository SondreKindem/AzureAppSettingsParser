/* eslint-disable no-unused-vars */

export function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

export function validateAzureJson(json) {
    console.log(json[0])
    return (isArray(json)
        && json[0]
        && typeof json[0] === 'object' || json[0] instanceof Object
        && json[0].hasOwn("name")
        && json[0].hasOwn("value"));
}

export function convertAzureJson(json) {
    const converted = {}
    for (const item of json) {
        converted[item.name] = item.value
    }
    return converted;
}

export function convertAppSettingsJson(json) {
    const converted = []
    for (const key of Object.keys(json)) {
        converted.push(
            {
                name: key,
                value: json[key],
                slotSetting: false
            })
    }
    return converted;
}

export function validateAppSettingsJson(json) {
    const keys = Object.keys(json)
    if (keys.length === 0) {
        return
    }

    const firstKey = keys[0]
    const isString = (typeof json[firstKey] === 'string' || json[firstKey] instanceof String)
    const isInt = (typeof json[firstKey] === 'number' || json[firstKey] instanceof Number)
    const isBool = (typeof json[firstKey] === 'boolean' || json[firstKey] instanceof Boolean)

    return (!isArray(json) && json[firstKey] && (isString || isInt || isBool))
}

export const Modes = {
    Azure: "Azure",
    AppSettings: "AppSettings"
}