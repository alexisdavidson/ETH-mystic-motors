import React, { useEffect, useState } from "react";

export const Timer = ({isSoldOut}) => {
    //Here's where you can set the deadline 
  const [deadline, setDeadline] = useState({
    year: 2023,
    month: 4,
    day: 23,
    hours: 15
  });
  const [deadlinePublic, setDeadlinePublic] = useState({
    year: 2023,
    month: 4,
    day: 23,
    hours: 17
  });
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerDone, setTimerDone] = useState(false)
  const [timeUntil, setTimeUntil] = useState("Whitelist Mint")

  const timezoneOffset = (new Date()).getTimezoneOffset() / 60; //Bkk: -7

  const [unix, setUnix] = useState(0);
  useEffect(() => {
    let dates = new Date(deadline.year, deadline.month - 1, deadline.day, deadline.hours - timezoneOffset);
    let unixTemp = dates - new Date()
    if (unixTemp < 0) {
      setTimeUntil("Public Sale")
      dates = new Date(deadlinePublic.year, deadlinePublic.month - 1, deadlinePublic.day, deadlinePublic.hours - timezoneOffset);
    }
    setUnix(dates - new Date());
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setUnix((prev) => prev - 1000);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // console.log(unix)
    let days = Math.floor(unix / 1000 / 60 / 60 / 24);
    let hours = Math.floor(unix / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(unix / 1000 / 60) % 60;
    let seconds = Math.floor(unix / 1000) % 60;
    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (unix < 0)
      setTimerDone(true)
    setDate({
      days,
      hours,
      minutes,
      seconds,
    });
  }, [unix]);

  return (
    <>
    <div className="text-lg mb-1 time-title">Time Left Until {timeUntil}:</div>
    {/* {timerDone || true ? ( */}
    {timerDone || isSoldOut? (
      <>
      <div className="text-4xl mb-[10px] time">
        00 <span className="colorgray">:</span> 00 <span className="colorgray">:</span> 00 <span className="colorgray">:</span> 00
      </div>
      </>
    ) : (
      <>
        <div className="text-4xl mb-[10px] time">
          {date.days} <span className="colorgray">:</span> {date.hours} <span className="colorgray">:</span> {date.minutes} <span className="colorgray">:</span> {date.seconds}
        </div>
      </>
    )}
    </>
  );
};
