import Link from "next/link";
import EventTable from "@/components/Tables/EventTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const EventsPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center pb-5">
          <h1 className="text-3xl font-semibold">Events Table</h1>
          <Link href="/addevents">
            <div className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer">
              Add Event
            </div>
          </Link>
        </div>
        <EventTable />
      </div>
    </DefaultLayout>
  );
};

export default EventsPage;
