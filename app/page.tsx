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
    {
      title: "THE UMONICS NAMES AND FACES METHOD",
      desc: "Memorise the Names and Faces of People.",
    },
    {
      title: "THE UMONICS NUMBER SHAPE METHOD",
      desc: "Memorise Numbers or Digits.",
    },
    {
      title: "THE UMONICS MAGIC ROOM METHOD",
      desc: "Memorise a Vast Amount of Information In Order.",
    },
    {
      title: "THE UMONICS MAPPING METHOD",
      desc: "Memorise Diagrams and Maps.",
    },
    { title: "THE UMONICS LINK METHOD", desc: "Memorise a Set of Lists." },
    {
      title: "THE UMONICS VISUAL-LINK METHOD",
      desc: "Memorise A Multitude of Visual Images.",
    },
    {
      title: "THE UMONICS DIRECT-LINK METHOD",
      desc: "Memorise General Knowledge Facts.",
    },
    {
      title: "THE UMONICS VOCAB-LINK METHOD",
      desc: "Memorise New Vocabulary Words.",
    },
  ];

  /*
• THE UMONICS NAMES AND FACES METHOD
Memorise the Names and Faces of People.
• THE UMONICS NUMBER SHAPE METHOD
Memorise Numbers or Digits.
°THE UMONICS MAGIC ROOM METHOD
Memorise a Vast Amount of Information In Order.
® THE UMONICS MAPPING METHOD
Memorise Diagrams and Maps.
°THE UMONICS LINK METHOD
Memorise a Set of Lists.
•THE UMONICS VISUAL-LINK METHOD
Memorise A Multitude of Visual Images.
• THE UMONICS DIRECT-LINK METHOD
Memorise General Knowledge Facts.
• THE UMONICS VOCAB-LINK METHOD
Memorise New Vocabulary Words.
  */

  return (
    <main className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white max-w-screen-2xl">
      <div className="hidden w-full h-[768px] grid-cols-7 gap-10 px-10 py-10 lg:grid md:grid xl:grid">
        <section className="flex flex-col items-center justify-start col-span-3 p-6 text-white bg-main-500 rounded-xl">
          <header className="w-full mb-4">
            <h2 className="text-2xl font-bold text-center">
              {`Get this Free Training Course for Parents with Preschoolers, Worth $289.99!`}
            </h2>
          </header>
          <VideoLanding />
          <div className="flex flex-col flex-1 w-full gap-4 mt-6">
            <h3 className="text-xl text-center">
              {`In this program, we'll discover 8 memory enhancement techniques`}
            </h3>
            <div className="grid flex-1 w-full grid-cols-4 grid-rows-2 gap-4">
              {CORE_VALUES.map((d, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center w-full h-full p-2 bg-white rounded-md shadow-sm"
                  >
                    <h4 className="text-[0.65rem] font-bold text-center text-main-600">
                      {d.title}
                    </h4>
                    <p className="text-[0.6rem] text-center text-main-600">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative flex flex-col items-center justify-start w-full col-span-4">
          <header className="relative z-10 flex items-center justify-center w-full h-20 px-20 bg-transparent">
            <h1 className="absolute top-0 right-0 text-3xl font-bold">
              THE <span className="text-main-500">UMONICS</span> METHOD
            </h1>
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
                <h4 className="text-xs font-bold text-center text-main-600">{d.title}</h4>
                <p className="text-xs text-center text-main-600">{d.desc}</p>
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
