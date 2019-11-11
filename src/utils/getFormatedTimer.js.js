export default (timer) => {
    let { miliseconds, seconds, minutes, hours } = timer;
    if (miliseconds < 10) {
        miliseconds = "00" + miliseconds;
    } else if (miliseconds < 100) {
        miliseconds = "0" + miliseconds
    }
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
}