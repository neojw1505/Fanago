"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";



import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";

import EventBanner from "../../public/eras-tour-event-banner.jpg";


export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <main className="container mt-[2vw] min-h-[100vh-14] space-y-5 px-[2vw] dark:text-white md:space-y-10">
      <div className="flex grow place-items-center items-center">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="flex grow place-items-center items-center w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Image
                  src={EventBanner}
                  alt="Event Image"
                  priority={true}
                  className="max-h-[60vh] w-full rounded-2xl object-contain"
                ></Image>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex"/>
          <CarouselNext className="hidden lg:flex"/>
        </Carousel>
      </div>
      <footer></footer>
    </main>
  )
}