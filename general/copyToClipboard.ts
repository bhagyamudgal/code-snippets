export const copyToClipboard = async (text: string) => {
    try {
        // console.log({ text });
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error("copyToClipboard =>", error);
    }
};
