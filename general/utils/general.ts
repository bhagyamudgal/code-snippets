export const isBase64 = (value: string) => {
    try {
        // Convert the string to a Buffer using the Base64 encoding
        const buffer = Buffer.from(value, "base64");

        // Check if the buffer can be encoded back to the original string
        return buffer.toString("base64") === value;
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
