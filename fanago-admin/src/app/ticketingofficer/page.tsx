import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";


export const metadata: Metadata = {
  title:
    "Ticketing Officer - Home",
  description: "This is the Ticketing Officer page for Ticket Master Swiftie",
};

const TicketingOfficersPage = () => {
  return (
    <DefaultLayout>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-3xl font-semibold">Ticketing Officer - Home</h1>
      </div>
      <div className="flex flex-col gap-10 bg-bodydark1 items-center justify-center h-100">
        <div className="flex flex-col sm:flex-row gap-5 justify-center m-4">
          <Link href="ticketingofficer/ticketvalidity">
            <div className="p-18 mx-6 w-full sm:w-auto whitespace-nowrap text-wrap p-9 font-medium bg-black text-white text-xl hover:text-black hover:bg-opacity-50 rounded-md text-center">
              Verify Ticket Validity
            </div>
          </Link>
          <Link href="ticketingofficer/venuesales">
            <div className="p-18 mx-6 w-full sm:w-auto whitespace-nowrap text-wrap p-9 font-medium bg-black text-white text-xl hover:text-black hover:bg-opacity-50 rounded-md text-center">
              On-Site Ticket Sales
            </div>
          </Link>
        </div>
      </div>
    </DefaultLayout>

  );
};

export default TicketingOfficersPage;
