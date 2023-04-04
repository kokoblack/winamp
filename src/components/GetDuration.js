export const convertTimeToSeconds = function(time) {
    let a = time.match(/\d+H|\d+M|\d+S/g),
        result = 0;

    let d = { 'H': 3600, 'M': 60, 'S': 1 },
        num,
        type;

    for (let i = 0; i < a.length; i++) {
        num = a[i].slice(0, a[i].length - 1);
        type = a[i].slice(a[i].length - 1, a[i].length);

        result += parseInt(num) * d[type];
    }

    return result;
}

export const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };