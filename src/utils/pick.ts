export const pick = (object: any, keys: string[], searhField = 'search') => {

    return keys.concat(searhField).reduce((obj: any, key: string) => {

        if (object && Object.prototype.hasOwnProperty.call(object, key)) {

            if (!!searhField && searhField == key) {

                obj["$text"] = { $search: `\"${(object[key])}\"` };

            } else {

                obj[key] = object[key];

            }
        }

        return obj;

    }, {});

};