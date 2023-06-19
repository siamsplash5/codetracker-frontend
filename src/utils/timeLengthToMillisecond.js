export default function timeLengthToMillisecond(timeString){
    let [hours, minutes, seconds] = timeString.split(':');
    if(!hours)hours="0";
    if(!minutes)minutes="0";
    if(!seconds)seconds="0"
    const milliseconds = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
    return milliseconds;
}