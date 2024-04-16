"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link';

  export default function EditVenueForm({ params: {venueId} }) {
  
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSeatMap, setVenueSeatMap] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVenueDetails(venueId);
  }, [venueId]);

    async function fetchVenueDetails(id) {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/get-venue-by-id?venueId=${id}`);
        const data = await response.json();
        console.log("API Data:", data);
        setVenueName(data.data.data.name);
        setVenueAddress(data.data.data.address);
        setVenueSeatMap(data.data.data.seatMap);

      } catch (error) {
        console.error("Error fetching venue details:", error);
        // Handle error as needed
      } finally {
        setIsLoading(false);
      }
    };

    async function handleUpdateVenue() {
      try {
        setIsLoading(true);
        const url = `/api/get-venue-by-id?venueId=${venueId}`; 
    
        const body = {
          venueId: venueId,
          name: venueName,
          address: venueAddress,
        };

        console.log('Request Body:', body);
    
        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
    
        if (!res.ok) {
          throw new Error("Failed to update venue");
        }
    
        alert("Venue updated successfully!");
      } catch (error) {
        console.error("Error updating venue:", error);
        alert("Failed to update venue. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

  async function deleteVenue() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get-venue-by-id?venueId=${venueId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete venue");
      }
  
      alert("Venue deleted successfully!");
      // Optionally, you might want to redirect or perform other actions after deletion.
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Failed to delete venue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
    <div className="bg-white p-6 rounded-md shadow-default dark:bg-boxdark">
      <h2 className="text-2xl font-semibold mb-6">Edit Venue</h2>

      <div className="flex flex-col gap-9">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Venue Name
          </label>
          <input
            type="text"
            placeholder="Venue Name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Venue Address
          </label>
          <input
            type="text"
            placeholder="Venue Address"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleUpdateVenue}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <Link href="/venues">
          <button
            className="bg-danger text-white px-4 py-2 rounded-md"
            onClick={deleteVenue}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          </Link>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
};