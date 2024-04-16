import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EventTableBook from "@/components/Tables/EventTableBook";

export const metadata: Metadata = {
    title:
      "Ticket Master Swiftie",
    description: "This is the Add Manager for Ticket Master Swiftie",
  };

const TicketingOfficersPage = () => {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-semibold pb-5">On-Site Ticket Sales</h1>
      <div className="flex flex-col gap-10">
        <EventTableBook />
      </div>
    </DefaultLayout>
  );
};

export default TicketingOfficersPage;
