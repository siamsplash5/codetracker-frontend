export default function isDifferenceThreeMonths(from, to) {
    const threeMonthsDuration = 30 * 24 * 60 * 60 * 1000;
    const difference = Math.abs(to - from);
    return difference <= threeMonthsDuration;
}
