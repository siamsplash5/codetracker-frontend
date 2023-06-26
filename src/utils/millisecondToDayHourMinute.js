export default function millisecondToDayHourMinute(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const remainingSeconds = seconds % (3600 * 24);
    const hours = Math.floor(remainingSeconds / 3600);
    const remainingMinutes = (remainingSeconds % 3600) / 60;
    const minutes = Math.floor(remainingMinutes);
    if (days) return days === 1 ? `${days} day` : `${days} days`;
    if (hours) return hours === 1 ? `${hours} hour` : `${hours} hours`;
    if (minutes)
        return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
}
