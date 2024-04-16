"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventsData() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        console.log("Response from API:", data); // Check the fetched data

        if (data.success) { // Ensure data is available and the request was successful
          setEvents(data.data.data); // Set venues state directly with the fetched data object
          console.log('Data fetched from API');
        } else {
          console.error('No events data found');
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error); // Set error state if an error occurs
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }

    fetchEventsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Event Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white text-center">
                Event Time
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white text-center">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((eventItem) => (
              <tr key={eventItem.eventGroupId}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {eventItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  {eventItem.timing.map(datetime => {
                    const formattedDate = new Date(datetime);
                    const options = {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric'
                    };
                    const formattedDateTime = formattedDate.toLocaleString('en-US', options);
                    return (
                      <p className="text-black dark:text-white" key={datetime} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {formattedDateTime}
                      </p>
                    );
                  })}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                    eventItem.status === 'OPENED'
                      ? 'bg-success text-success'
                      : eventItem.status === 'UPCOMING'
                      ? 'bg-primary text-primary'
                      : 'bg-danger text-danger'
                    }`}
                  >
                    {eventItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div>
                    {/* Edit Button */}
                    <Link href={`/editevent/${eventItem.eventGroupId}`}>
                      <button className="hover:text-primary">
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

export default EventTable;
