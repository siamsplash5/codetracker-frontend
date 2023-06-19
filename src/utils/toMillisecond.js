export default function toMillisecond(dateString, timeString){
    const combinedString = dateString + ' ' + timeString;
    const dateTime = new Date(combinedString);
    const milliseconds = dateTime.getTime();
    return milliseconds;
}
