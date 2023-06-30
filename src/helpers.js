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
    const unflattenedJson = {};

    for (const [key, value] of Object.entries(flatJson)) {
        const parts = key.split(/[:]+|__+/); // Split by ":" or "__"
        let currentObj = unflattenedJson;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (Number.isInteger(Number(parts[i + 1]))) {
                currentObj[part] = currentObj[part] || [];
                currentObj = currentObj[part];
            } else {
                currentObj[part] = currentObj[part] || {};
                currentObj = currentObj[part];
            }
        }

        const lastPart = parts[parts.length - 1];
        if (Number.isInteger(Number(lastPart))) {
            const lastPartIndex = Number(lastPart);
            if (Array.isArray(currentObj)) {
                if (lastPartIndex >= currentObj.length) {
                    currentObj.length = lastPartIndex + 1;
                }
                currentObj[lastPartIndex] = value;
            }
        } else {
            currentObj[lastPart] = value;
        }
    }

    return unflattenedJson;
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