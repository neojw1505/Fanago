"use client"
// VenueTable.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const VenueTable = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenuesData() {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();
        console.log("Data:", data); // Check the fetched data
        
        if (data.data.data && data.data.data.length > 0) { // Ensure data is an array and not empty
          setVenues(data.data.data); // Set venues state directly with the fetched data array
        } else {
          console.error('No venues data found');
        }
      
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
  
    fetchVenuesData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Venue Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Venue Address
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody>
            {venues.map((venueItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {venueItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {venueItem.address}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {/* Edit  on */}
                    <Link
                    href={`/editvenue/${venueItem.venueId}`}>
                    <button
                      className="hover:text-primary">
                      {/* SVG or icon for editing */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-3">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VenueTable;
