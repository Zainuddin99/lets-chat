export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const isObjectsEqual = (object1: object, object2: object): boolean => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        // @ts-expect-error
        const val1 = object1[key];
        // @ts-expect-error
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            (areObjects && !isObjectsEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
        ) {
            return false;
        }
    }
    return true;

    function isObject(object: object) {
        return object != null && typeof object === "object";
    }
};

export const throwError = (message: string): never => {
    throw new Error(message);
};

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const firstChar = (str: string) => {
    return str.charAt(0);
};

export const getNameConstants = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export function inRange(x: number, min: number, max: number) {
    return (x - min) * (x - max) <= 0;
}
