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
    "Visualisation: Turn information into vivid mental images.",
    "Association: Link visuals into memorable stories.",
    "Facial Encoding: Connect names with facial features.",
    "Size Emphasis: Highlight key elements for better recall.",
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white max-w-screen-2xl">
      <div className="hidden w-full h-[768px] grid-cols-6 gap-10 px-10 py-10 lg:grid md:grid xl:grid">
        <section className="flex flex-col items-center justify-start col-span-2 p-6 text-white bg-main-500 rounded-xl">
          <header className="w-full mb-4">
            <h2 className="text-2xl font-bold text-center">
              {`Get this Free Training Course for Parents with Preschoolers, Worth $289.99!`}
            </h2>
          </header>
          <VideoLanding />
          <div className="flex flex-col flex-1 w-full gap-4 mt-6">
            <h3 className="text-xl text-center">
              {`In this course, we'll discover memory-enhancement techniques:`}
            </h3>
            <div className="grid flex-1 w-full grid-cols-2 grid-rows-2 gap-4">
              {CORE_VALUES.map((d, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center w-full h-full p-2 bg-white rounded-md shadow-sm"
                  >
                    <h4 className="text-xs text-center text-main-600">{d}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative flex flex-col items-center justify-start w-full col-span-4">
          <header className="relative z-10 flex items-center justify-center w-full h-20 px-20 bg-transparent">
            <div className="text-3xl font-bold">
              THE <span className="text-main-500">UMONICS</span> METHOD
            </div>
          </header>
          <div className="relative flex-1">
            <div className="absolute -top-24 translate-x-1/2 right-1/2 w-[30rem] h-[30rem]">
              <Image src={PricesGraphic} fill alt="prices" objectFit="cover" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start flex-1 w-full">
            <OptInForm />
          </div>
          <div className="absolute flex items-center justify-center w-full -space-x-20 -bottom-28">
            <Image src={Child1} width={180} height={180} alt="child" />
            <Image src={Child2} width={180} height={180} alt="child" />
            <Image src={Child3} width={180} height={180} alt="child" />
            <Image src={Child4} width={180} height={180} alt="child" />
          </div>
        </section>
      </div>
      {/* MOBILE */}
      <div className="flex flex-col items-center justify-start px-4 pt-6 xl:hidden lg:hidden md:hidden">
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
        <div className="flex flex-col items-center justify-start flex-1 w-full">
          <OptInForm />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 p-6 mt-4 shadow rounded-xl bg-main-500">
          <h3 className="text-lg text-center text-white">
            {`Get this Free Training Course for Parents with Preschoolers, Worth $289.99!`}
          </h3>
          {CORE_VALUES.map((d, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-md shadow-sm w-full h-[4rem] flex justify-center items-center p-2"
              >
                <h4 className="text-xs text-center text-main-600">{d}</h4>
              </div>
            );
          })}
        </div>
        <div className="relative flex items-center justify-center w-full -space-x-20">
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
