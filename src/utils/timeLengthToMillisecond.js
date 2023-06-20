export default function timeLengthToMillisecond(timeString) {
  let [days, hours, minutes] = timeString.split(':');

  if (!days) days = "0";
  if (!hours) hours = "0";
  if (!minutes) minutes = "0";

  const milliseconds = (parseInt(days) * 24 * 3600 + parseInt(hours) * 3600 + parseInt(minutes) * 60) * 1000;
  return milliseconds;
}
