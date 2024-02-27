import React from "react";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { Card } from "@/components/ui/card";

const IntroComponent = () => {
  return (
    <Card className="flex flex-col p-4">
      <h2 className="text-2xl font-semibold">{`Let's Get Started!`}</h2>
      <p className="text-sm text-muted-foreground">
        {`Welcome to our new Umonics Method Learning System! Here is a quick guide to get you
        started. Follow the video below.`}
      </p>
      <div className="grid w-full grid-cols-5 gap-8 mt-6">
        <div className="col-span-2">
          <CldVideoPlayer
            id="sea-turtle"
            width={"1920"}
            height={"1080"}
            src="umonics/tutorial"
            logo={{
              imageUrl:
                "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1676058142/assets/space-jelly-cosmo-helmet.svg",
              onClickUrl: "/",
            }}
          />
        </div>
        <div className="flex flex-col col-span-3">
          <h3 className="text-lg font-medium">
            Here are a few steps to get started with your class today
          </h3>
          <ul className="flex flex-col gap-1 mt-2 ml-4 list-decimal">
            <li className="">
              Go to the <span className="font-medium">{`"Calendar"`}</span> tab
              located on the left side.
            </li>
            <li className="">{`There will be notifications in case you haven't enrolled for a class that week.`}</li>
            <li className="">
              From there you can click the{" "}
              <span className="font-medium">{`"Add Class"`}</span> button on the
              date you want to schedule.
            </li>
            <li className="">
              {
                "Choose a class from the available timeslots based on your preference. Save changes"
              }
            </li>
            <li className="">
              {
                "Click on your scheduled class to see the meeting link and time zones for that schedule."
              }
            </li>
            <li className="">
              {`You can click "No" to request class cancellation 3 days before the actual date.`}
              <p className="text-xs text-muted-foreground">
                {`*Note that you can only schedule 1 class per week and 3 days before the actual date. The start of the week is every Saturday and the end is every Friday. Also, we won't conduct make-up classes in the event that you missed enrolling for a class in that week.`}
              </p>
            </li>
            <li className="">
              {`Enjoy and welcome to the Umonics Method family!`}
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default IntroComponent;
