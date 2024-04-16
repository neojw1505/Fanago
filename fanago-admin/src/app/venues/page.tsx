import Link from "next/link";
import VenueTable from "@/components/Tables/VenueTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const VenuesPage = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center pb-5">
          <h1 className="text-3xl font-semibold">Venues Table</h1>
          {/* <Link href="/addvenues">
            <div className=" bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 cursor-pointer">
              Add Venue
            </div>
          </Link> */}
        </div>
        <VenueTable/>
      </div>
    </DefaultLayout>
  );
};

export default VenuesPage;
