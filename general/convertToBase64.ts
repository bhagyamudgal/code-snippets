export const covertToBase64 = (file: any) => {
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
