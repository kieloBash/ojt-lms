// UI
import { Check, X } from "lucide-react";
import AllInclusiveBtn from "@/components/pages/dashboard/new-enrollment/btn/all-inclusive-btn";
import LessonsOnlyBtn from "@/components/pages/dashboard/new-enrollment/btn/basic-btn";
import CloseButton from "./close-btn";

export function SubscriptionPopUp({ close }: { close: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-white z-[100] flex justify-center items-center">
        <CloseButton close={close} />
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-6 px-24 mt-10">
          <div className="flex flex-col w-full gap-2 text-center">
            <div className="text-4xl font-extrabold uppercase text-main-500">
              SUBSCRIPTION PLANS
            </div>
            <p className="text-dark-1">
              Choose the best subscription plan for your child's learning
              journey.
            </p>
          </div>
          <div className="grid flex-1 w-full max-w-[50rem] grid-cols-2 grid-rows-1 gap-10 mx-auto">
            <div className="flex flex-col mb-4 overflow-hidden rounded-lg shadow-lg">
              <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full">
                    Lessons Only
                  </span>
                </div>
                <div className="flex justify-center text-6xl font-extrabold leading-none">
                  <span className="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500">
                    from
                  </span>
                  $40
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500">
                    /month
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                <ul>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Online class
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Flexible schedule
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Monthly student progress report
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Video recordings of class notes
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Written class notes scripts
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Home activity materials
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Flashcards
                    </p>
                  </li>
                </ul>
                <div className="flex items-center justify-center mt-8 rounded-md">
                  <LessonsOnlyBtn close={close}/>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-4 overflow-hidden rounded-lg shadow-lg">
              <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                <div className="flex justify-center">
                  <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full">
                    All-Inclusive Package
                  </span>
                </div>
                <div className="flex justify-center text-6xl font-extrabold leading-none">
                  <span className="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500">
                    from
                  </span>
                  $55
                  <span className="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500">
                    /month
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                <ul>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Online class
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Flexible schedule
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Monthly student progress report
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Video recordings of class notes
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Written class notes scripts
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Home activity materials
                    </p>
                  </li>
                  <li className="flex items-start mt-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                      Flashcards
                    </p>
                  </li>
                </ul>
                <div className="flex items-center justify-center mt-8 rounded-md">
                  <AllInclusiveBtn close={close}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
