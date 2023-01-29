export const isBase64 = (value: string) => {
    try {
        const base64regex =
            /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
        return base64regex.test(value);
    } catch (error) {
        return false;
    }
};
