import React, { useEffect, useState } from "react";

export const Timer = () => {
    //Here's where you can set the deadline 
  const [deadline, setDeadline] = useState({
    year: 2023,
    month: 2,
    day: 26,
    hours: 16
  });
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [unix, setUnix] = useState(0);
  useEffect(() => {
    const dates = new Date(deadline.year, deadline.month - 1, deadline.day, deadline.hours);
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
    console.log(unix)
    let days = Math.floor(unix / 1000 / 60 / 60 / 24);
    let hours = Math.floor(unix / 1000 / 60 / 60) % 24;
    let minutes = Math.floor(unix / 1000 / 60) % 60;
    let seconds = Math.floor(unix / 1000) % 60;
    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    setDate({
      days,
      hours,
      minutes,
      seconds,
    });
  }, [unix]);

  return (
    <div className="text-4xl mb-[10px] time">
      {date.days} <span className="colorgray">:</span> {date.hours} <span className="colorgray">:</span> {date.minutes} <span className="colorgray">:</span> {date.seconds}
    </div>
  );
};
