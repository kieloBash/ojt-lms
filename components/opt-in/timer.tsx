import React, { useState, useEffect } from "react";

type Props = {
  duration: number;
  type?: "Small" | "Normal";
};

const CountdownTimer: React.FC<Props> = ({ duration, type = "Normal" }) => {
  const [timeRemainingInMilliseconds, setTimeRemainingInMilliseconds] =
    useState(duration);

  useEffect(() => {
    if (timeRemainingInMilliseconds > 0) {
      const timerId = setTimeout(() => {
        setTimeRemainingInMilliseconds(timeRemainingInMilliseconds - 10);
      }, 10);

      return () => clearTimeout(timerId); // cleanup on unmount
    }
  }, [timeRemainingInMilliseconds]);

  const minutes = Math.floor(timeRemainingInMilliseconds / (1000 * 60));
  const seconds = Math.floor((timeRemainingInMilliseconds / 1000) % 60);
  const milliseconds = Math.floor((timeRemainingInMilliseconds / 10) % 1000);

  if (type === "Normal")
    return (
      <div className="flex flex-col">
        <div className="flex gap-4 mt-2">
          <div className="flex flex-col items-center justify-center -space-y-2 w-28">
            <span className="font-bold text-8xl text-main-500">
              {String(minutes).padStart(2, "0")}
            </span>
            <span className="">MINUTES</span>
          </div>
          <div className="flex items-center justify-center font-bold text-8xl text-main-500">
            :
          </div>
          <div className="flex flex-col items-center justify-center -space-y-2 w-28">
            <span className="font-bold text-8xl text-main-500">
              {String(seconds).padStart(2, "0")}
            </span>
            <span className="">SECONDS</span>
          </div>
          <div className="flex items-center justify-center font-bold text-8xl text-main-500">
            :
          </div>
          <div className="flex flex-col items-center justify-center -space-y-2 w-28">
            <span className="font-bold text-8xl text-main-500">
              {String(milliseconds).substring(1, 3).padStart(2, "0")}
            </span>
            <span className="">MILLISECONDS</span>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold text-center text-green-500">
          Sign up now to receive a discount just for you!
        </p>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 mt-2">
        <div className="flex flex-col items-center justify-center -space-y-2 w-28">
          <span className="font-bold text-white text-8xl">
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="">MINUTES</span>
        </div>
        <div className="flex items-center justify-center font-bold text-8xl text-main-500">
          :
        </div>
        <div className="flex flex-col items-center justify-center -space-y-2 w-28">
          <span className="font-bold text-white text-8xl">
            {String(seconds).padStart(2, "0")}
          </span>
          <span className="">SECONDS</span>
        </div>
        <div className="flex items-center justify-center font-bold text-8xl text-main-500">
          :
        </div>
        <div className="flex flex-col items-center justify-center -space-y-2 w-28">
          <span className="font-bold text-white text-8xl">
            {String(milliseconds).substring(1, 3).padStart(2, "0")}
          </span>
          <span className="">MILLISECONDS</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-center text-white">
        Sign up now to receive a discount just for you!
      </p>
    </div>
  );
};

export default CountdownTimer;
