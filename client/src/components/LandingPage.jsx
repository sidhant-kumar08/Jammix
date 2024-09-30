import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AvatarCircles from "./ui/avatar-circles";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import WordFadeIn from "@/components/ui/word-fade-in";
import Marquee from "@/components/ui/marquee";
import GradualSpacing from "@/components/ui/gradual-spacing";

//start

const reviews = [
  {
    name: "Auto Wala",
    img: "AutoWala.jpg",
  },
  {
    name: "Truck Driver Playlist",
    img: "Truck.jpg",
  },
  {
    name: "Emraan Hashmi",
    img: "Emraan.jpg",
  },
  {
    name: "Bus Wale ki Playlist",
    img: "busDriver.jpg",
  },
  {
    name: "Indian Barber",
    img: "barber.jpg",
  },
  {
    name: "Arijit Singh",
    img: "Arijit.jpg",
  },
];

const firstRow = reviews;

const ReviewCard = ({ img, name }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <img className="rounded-xl h-52 w-52" alt="" src={img} />
      </div>

      <figcaption className="text-2xl text-center font-semibold dark:text-white">
        {name}
      </figcaption>
    </figure>
  );
};

//end

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

function LandingPage() {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="py-2 overflow-x-hidden">
        <div className="z-10 flex mt-4 items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <Link to="/home">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Start Sharing</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </Link>
          </div>
        </div>

        

        <div>
           <GradualSpacing
            className="font-display text-center text-wrap mt-4 text-2xl md:text-5xl font-bold -tracking-widest  text-black dark:text-white md:leading-[5rem]"
            text="Discover,  Share  &  Groove."
            />
        </div>

        <div className="justify-center text-center flex flex-col mt-2 text-wrap select-none">
          <h2 className="text-lg md:text-2xl font-[300] font-[geist]">
            Playlists from Spotify and YouTube. 🎵
          </h2>
          <h2 className="text-2xl font-[300] font-[geist]">Shared by others</h2>
        </div>

        <div className="flex justify-center mt-4">
          <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
        </div>

        <div className="mt-8 flex justify-center">
          <button class="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
            <div class="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
              Get Started
            </div>
            <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        <div className="mt-12">
          <WordFadeIn words="Browse Your favourite playlists" />
        </div>

        <div className="marquee">
          <div className="relative flex mt-4 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background ">
            <Marquee pauseOnHover className="[--duration:50s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>



        <div>
        
        </div>


        <footer className="flex justify-center bottom-0 items-center align-middle font-mono">
          <h1>Made with ❤ by Sidhant</h1>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
