export const isBase64 = (value: string) => {
    try {
        const base64regex =
            /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
        return base64regex.test(value);
    } catch (error) {
        return false;
    }
};

export const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                const result = reader.result as String;
                const base64String = result
                    ?.replace("data:", "")
                    .replace(/^.+,/, "");

                resolve(base64String);
            }
        };
        reader.readAsDataURL(file);
        reader.onerror = (error) => reject(error);
    });
};

export const copyToClipboard = async (text: string) => {
    try {
        // console.log({ text });
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error("copyToClipboard =>", error);
    }
};

export const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
