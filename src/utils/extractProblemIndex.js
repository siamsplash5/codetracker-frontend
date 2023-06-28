export default function extractProblemIndex(input) {
    const dotIndex = input.indexOf(".");
    if (dotIndex !== -1) {
        return input.substring(0, dotIndex);
    }
    return "";
}
