"use client"
import React, { useState } from "react";
import Link from 'next/link';

const VenuesForm = () => {
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [isAddingVenue, setIsAddingVenue] = useState(false); // Track if venue is being added

  const handleAddVenue = async () => {
    try {
      setIsAddingVenue(true); // Set flag to true when adding venue
      const url = "/api/venues";

      // Hardcoded seatMap with default values
      const seatMap = [
        {
            "noOfCol": 10,
            "noOfRow": 30,
            "category": "CAT1",
            "noOfCategory": 3,
            "positions": ["UC_A","UC_B","UC_C"]
        },
        {
            "noOfCol": 10,
            "noOfRow": 30,
            "category": "CAT2",
            "noOfCategory": 3,
            "positions": [
                "DRESS_F",
                "DRESS_D",
                "DRESS_B"
            ]
        },
        {
            "noOfCol": 10,
            "noOfRow": 30,
            "category": "CAT3",
            "noOfCategory": 6,
            "positions": [
                "DRESS_E",
                "DRESS_C",
                "DRESS_A",
                "STALL_D",
                "STALL_C",
                "STALL_B"
            ]
        },
        {
            "noOfCol": 10,
            "noOfRow": 30,
            "category": "CAT4",
            "noOfCategory": 1,
            "positions": [
                "STALL_A"
            ]
        }
    ];

      // Prepare body for POST request
      const body = {
        name: venueName,
        address: venueAddress,
        seatMap: seatMap
      };

      // Log the body before making the fetch request
      console.log('Request Body:', body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to add venue");
      }

      // Reset form fields after successful submission
      setVenueName("");
      setVenueAddress("");
      alert("Venue added successfully!");
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue. Please try again.");
    } finally {
      setIsAddingVenue(false); // Reset flag regardless of success or failure
    }
  };


  return (
    <div className="bg-white p-6 rounded-md shadow-default dark:bg-boxdark">
      <h2 className="text-2xl font-semibold mb-6">Add Venue</h2>

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

        <div className="flex justify-end mt-4">
         <Link href="/venues">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleAddVenue} // Call handleAddVenue function on button click
          >
            Confirm
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VenuesForm;
