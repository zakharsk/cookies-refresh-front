export function msToMinAndSec(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round((millis % 60000) / 1000);
  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
