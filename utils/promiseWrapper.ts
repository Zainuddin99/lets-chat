export const promiseWrapper = (fn: (...args: any) => any) => {
    return (...args: any) =>
        new Promise(async (resolve, reject) => {
            try {
                const response = await fn(...args);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
};
