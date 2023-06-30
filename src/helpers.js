/* eslint-disable no-unused-vars */

export function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

export function stripComments(jsonString) {
return jsonString.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m)
}

export function validateAzureJson(json) {
    return (isArray(json)
        && json[0]
        && typeof json[0] === 'object' || json[0] instanceof Object
        && json[0].hasOwn("name")
        && json[0].hasOwn("value"));
}

export function convertAzureJson(json) {
    const obj = {}
    for (const item of json) {
        obj[item.name] = item.value
    }

    return unflattenJson(obj)
}

export function convertAppSettingsJson(json) {
    const converted = getFlatObject(json)

    const finished = []
    for (const key of Object.keys(converted)) {
        finished.push(
            {
                name: key,
                value: converted[key],
                slotSetting: false
            })
    }
    return finished;
}

/**
 * Stolen from https://stackoverflow.com/a/39547310
 */
function getFlatObject(object) {
    function iter(o, p) {
        if (o && typeof o === 'object') {
            Object.keys(o).forEach(function (k) {
                iter(o[k], p.concat(k));
            });
            return;
        }
        path[p.join('__')] = o;
    }
    const path = {};
    iter(object, []);
    return path;
}

function unflattenJson(flatJson) {
    return Object.entries(flatJson).reduce((acc, [key, value]) => {
        key.split(/[:]+|__+/).reduce((obj, part, index, arr) => {
            const isLastPart = index === arr.length - 1;
            return (obj[part] = isLastPart ? value : obj[part] || (Number(arr[index + 1]) >= 0 ? [] : {})), obj[part];
        }, acc);
        return acc;
    }, {});
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