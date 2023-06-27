export default function getProblemIndex(currentIndex){
    // if cross 'Z' problem number will be 'A1', 'B1'
    if (currentIndex >= 26) {
        let number = null;
        if (currentIndex >= 78) {
            number = 3;
        }
        if (currentIndex >= 52) {
            number = 2;
        }
        if(currentIndex>=26){
            number = 1;
        }
        return `${String.fromCharCode("A".charCodeAt(0) + currentIndex)}${number}`;
    }
    return String.fromCharCode("A".charCodeAt(0) + currentIndex);
}