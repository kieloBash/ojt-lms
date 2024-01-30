"use client";
import React from "react";

// IMG
import childOnline from "@/public/pics/children-online.jpg";
import flashCards from "@/public/pics/flash-cards.jpg";
import onlineClass from "@/public/pics/online-class.jpg";
import schedule from "@/public/pics/schedule.jpg";
import recording from "@/public/pics/recording.jpg";
import CountdownTimer from "./timer";
import Image from "next/image";

const InfoSection = () => {
  const INFO = [
    {
      img: childOnline,
      title: "Online Class Experience",
      p: "Experience high-level and a fun experience for your child!",
    },
    {
      img: schedule,
      title: "Flexible Class Schedules",
      p: "You can customized when you are available to take your classes!",
    },
    {
      img: onlineClass,
      title: "Monthly Student Progress Report",
      p: "Gain detailed insights into your child's academic achievements and improvement areas.",
    },
    {
      img: flashCards,
      title: "Flashcards",
      p: "Utilise visual aids to reinforce and master essential concepts, promoting active and visual learning.",
    },
    {
      img: recording,
      title: "Video Recordings of Classes",
      p: "Enjoy the convenience of reviewing class content anytime, fostering better understanding and reinforcement of concepts.",
    },
  ];
  return (
    <section className="w-full -mt-4">
      <div className="flex flex-col w-full h-full px-10 py-8 text-white bg-main-700 rounded-t-2xl">
        <h2 className="mt-10 text-6xl font-extrabold text-center">{`Here's what you can get`}</h2>
        <p className="mt-6 text-xl font-medium text-center uppercase">
          When you subscribe to Umonics Method...
        </p>
        <div className="grid grid-cols-5 gap-4 mt-8">
          {INFO.map((d, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="w-full h-[18rem] rounded-2xl relative overflow-hidden">
                  <Image alt="pic1" src={d.img} fill objectFit={"cover"} />
                </div>
                <div className="flex items-center justify-center w-full h-16 mt-4">
                  <h3 className="text-2xl font-bold text-center">{d.title}</h3>
                </div>
                <p className="mt-1 text-sm text-center">{d.p}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-8 -space-y-0">
          <p className="text-xl text-white">Limited Promo Time</p>
          <CountdownTimer duration={3 * 60 * 1000} type="Small" />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
