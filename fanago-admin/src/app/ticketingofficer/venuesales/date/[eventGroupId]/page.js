"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
// import BannerWithFallback from "@/components/BannerWithFallback"

export default function EventDetailsPage({ params: { eventGroupId } }) {
  // const { toast } = useToast();

  function formatTime(time) {
    let date = new Date(time);
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-SG", options);
  }

  async function getEventDetails(id) {
    try {
      const res = await fetch(`/api/event-group?eventGroupId=${id}`);
      const data = await res.json();
      setEventData(data.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch event details.",
        status: "error",
      });
    }
  }

  // const { data: session, status } = useSession();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEventDetails(eventGroupId);
  }, []);

  if (isLoading) return <p className="p-5 text-center">Loading...</p>;
  if (!eventData) return <p className="p-5 text-center">No data</p>;

  return (
    <DefaultLayout>
      <main className="container mt-[2vw] min-h-[100vh-14] space-y-6 px-[4vw] dark:text-white">
        <div>
          <Link href={`../`} className="hidden items-center sm:inline-flex">
            <Button variant="secondary" className="bg-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer">
              <ChevronLeft className="max-h-[20px]" />
              <span className="my-auto text-sm font-medium md:text-sm lg:text-base">
                Back to On-Site Ticket Sales
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex grow flex-col flex-wrap items-center space-y-4">
          <h1 className="text-lg font-bold md:text-xl lg:text-3xl">{eventData.name}</h1>
          <h3 className="text-md text-center md:text-lg lg:text-xl">{eventData.venue.name}</h3>
        </div>

        <footer className="flex w-full flex-row-reverse px-[6vw] py-8 justify-center">
          <div className="container flex flex-wrap justify-center">
            {eventData.eventGroupDetails.map((eventDetail, index) => (
              <Link
                href={`../book/${eventDetail.eventGroupDetailId}?venueId=${eventData.venue.venueId}&venueName=${eventData.venue.name}&venueAdd=${eventData.venue.address}`}
                key={index}
              >
                <Button className="m-2 w-full whitespace-nowrap text-wrap p-10 font-medium bg-black text-white hover:text-black sm:w-auto">
                  {formatTime(eventDetail.dateTime)}
                </Button>
              </Link>
            ))}
          </div>
        </footer>
      </main>
    </DefaultLayout>

  );
}
