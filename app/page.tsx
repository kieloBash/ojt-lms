import VideoPlayer from "@/components/opt-in/player";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PageProps } from "@/lib/interfaces/page.props";
import InfoSection from "@/components/opt-in/info";
import VideoLanding from "@/components/global/VideoLanding";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PricesGraphic from "@/public/pics/graphics1.png";

import Child1 from "@/public/pics//children/child1.png";
import Child2 from "@/public/pics//children/child2.png";
import Child3 from "@/public/pics//children/child3.png";
import Child4 from "@/public/pics//children/child4.png";
import OptInForm from "@/components/opt-in/form";

export default function Home({ searchParams }: PageProps) {
  // redirect("/auth/sign-in")
  // console.log(searchParams);
  const user = auth();
  // console.log(user);
  if (user.userId || searchParams.__clerk_created_session)
    redirect("/dashboard");

  const CORE_VALUES = [
    "Visualization: Turning numbers, words, names into memorable mental pictures",
    "Association: Linking visuals together into stories",
    "Facial Encoding: Connecting names to facial features ",
    "Size Emphasis: Making key parts of images very large for recall",
  ];

  return (
    <main className="flex flex-col min-h-screen overflow-hidden bg-white">
      <div className="lg:grid md:grid xl:grid grid-cols-6 px-10 py-10 gap-10 h-screen hidden">
        <section className="bg-main-500 rounded-xl col-span-2 text-white p-6 flex justify-start items-center flex-col">
          <header className="w-full mb-4">
            <h2 className="text-center text-2xl font-bold">
              Here is where the title will be placed!
            </h2>
          </header>
          <VideoLanding />
          <div className="flex flex-col w-full mt-6 flex-1 gap-4">
            <h3 className="text-center text-xl">
              Learn some of the core techniques <br /> in our Webinar!
            </h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full flex-1">
              {CORE_VALUES.map((d, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white rounded-md shadow-sm w-full h-full flex justify-center items-center p-2"
                  >
                    <h4 className="text-main-600 text-xs text-center">{d}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="w-full col-span-4 flex flex-col justify-start items-center relative">
          <header className="flex items-center justify-center w-full h-20 px-20 bg-transparent z-10 relative">
            <div className="text-3xl font-bold">
              THE <span className="text-main-500">UMONICS</span> METHOD
            </div>
          </header>
          <div className="flex-1 relative">
            <div className="absolute -top-24 translate-x-1/2 right-1/2 w-[30rem] h-[30rem]">
              <Image src={PricesGraphic} fill alt="prices" objectFit="cover" />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col justify-start items-center">
            <OptInForm />
          </div>
          <div className="w-full absolute -bottom-28 flex justify-center items-center -space-x-20">
            <Image src={Child1} width={180} height={180} alt="child" />
            <Image src={Child2} width={180} height={180} alt="child" />
            <Image src={Child3} width={180} height={180} alt="child" />
            <Image src={Child4} width={180} height={180} alt="child" />
          </div>
        </section>
      </div>
      {/* MOBILE */}
      <div className="flex xl:hidden lg:hidden md:hidden flex-col justify-start items-center pt-6 px-4">
        <header className="flex items-center justify-center w-full mb-4">
          <div className="text-xl font-bold text-center">
            THE <span className="text-main-500">UMONICS</span> METHOD
          </div>
        </header>
        <VideoLanding />
        <div className="h-[24rem] relative bg-transparent w-full -mt-8">
          <div className="relative w-[24rem] h-[24rem]">
            <Image src={PricesGraphic} fill alt="prices" objectFit="cover" />
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-start items-center">
          <OptInForm />
        </div>
        <div className="w-full rounded-xl shadow bg-main-500 p-6 mt-4 flex flex-col justify-center items-center gap-2">
          <h3 className="text-center text-lg text-white">
            Learn some of the core techniques in our Webinar!
          </h3>
          {CORE_VALUES.map((d, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-md shadow-sm w-full h-[4rem] flex justify-center items-center p-2"
              >
                <h4 className="text-main-600 text-xs text-center">{d}</h4>
              </div>
            );
          })}
        </div>
        <div className="w-full relative flex justify-center items-center -space-x-20">
          <Image src={Child1} width={180} height={180} alt="child" />
          <Image src={Child2} width={180} height={180} alt="child" />
          <Image src={Child3} width={180} height={180} alt="child" />
          <Image src={Child4} width={180} height={180} alt="child" />
        </div>
      </div>
      <InfoSection />
    </main>
  );
}
