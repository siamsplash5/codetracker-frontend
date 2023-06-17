export default function changeCFUrl(url){
    const cfRegex = /\/problemset\/problem\/(\d+)\/(\w+)/;
    const matches = url.match(cfRegex);
    if (matches && matches.length === 3) {
        const contestID = matches[1];
        const problemIndex = matches[2];
        return `https://codeforces.com/contest/${contestID}/problem/${problemIndex.toUpperCase()}`;
    }
    return url;
};