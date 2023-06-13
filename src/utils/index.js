export const toTimeString = (sec, showMilliSeconds = true) => {
  sec = parseFloat(sec);
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let maltissaRegex = /\..*$/; // matches the decimal point and the digits after it e.g if the number is 4.567 it matches .567

  let millisec = String(seconds).split(".");
  return (
    hours +
    ":" +
    minutes +
    ":" +
    String(seconds).replace(maltissaRegex, "") +
    (showMilliSeconds
      ? millisec[1]
        ? `.${millisec[1].slice(0, 3)}`
        : ".000"
      : "")
  );
};
