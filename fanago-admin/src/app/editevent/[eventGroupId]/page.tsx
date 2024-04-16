"use client";
import React, { useState, useEffect} from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link';
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";

  export default function EditEventsForm({ params: {eventGroupId} }) {
  
  // State variables to store form data (for create)
  const [eventName, setEventName] = useState('');
  const [venueId, setVenueId] = useState('');
  const [eventType, setEventType] = useState('');
  const [timings, setTimings] = useState([]);
  const [bookingAllowed, setBookingAllowed] = useState(false);
  // const [eventTypeId, setEventTypeId] = useState('');
  const [cancellationFee, setCancellationFee] = useState('');
  const [description, setDescription] = useState('');
  const [posterImgUrl, setPosterImgUrl] = useState('');
  const [bannerImgUrl, setBannerImgUrl] = useState('');
  const [categoryPrices, setCategoryPrices] = useState({
    CAT1: '',
    CAT2: '',
    CAT3: '',
    CAT4: ''
  });
  
  // Other Events Fields
  const [eventStatus, setEventStatus] = useState("");
  const [eventManagerId, setEventManagerId] = useState(3);
  const [processRefund, setProcessRefund] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch EventForm Details
  useEffect(() => {
    fetchEventDetails(eventGroupId);
  }, [eventGroupId]);

  async function fetchEventDetails(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get-event-by-id?eventGroupId=${id}`);
      const data = await response.json();
      console.log("API Data:", data);
      
      setEventName(data.data.data.name);
      setVenueId(data.data.data.venue.venueId); // Accessing venueId from nested venue object
      setEventType(data.data.data.eventType);
      setTimings(data.data.data.eventGroupDetails.map(detail => detail.dateTime)); // Extracting dateTime values from eventGroupDetails
      setBookingAllowed(data.data.data.bookingAllowed);
      setCancellationFee(data.data.data.cancellationFee);
      setDescription(data.data.data.description);
      setEventManagerId(data.data.data.eventManagerId);
      setPosterImgUrl(data.data.data.posterImgUrl);
      setBannerImgUrl(data.data.data.bannerImgUrl);
      setCategoryPrices(
        data.data.data.eventGroupPricing.reduce((prices, category) => {
          prices[category.category] = category.price;
          return prices;
        }, {})
      ); // Converting array of category prices to object
      setEventStatus(data.data.data.status); // Accessing eventStatus from status key

    } catch (error) {
      console.error("Error fetching event details:", error);
      // Handle error as needed
    } finally {
      setIsLoading(false);
    }
  };

// Update Event and Event Status
async function handleUpdateEvent() {
  try {
    setIsLoading(true);
    
    // First API call: Update general event details
    const updateUrl = `/api/get-event-by-id?eventGroupId=${eventGroupId}`; // Replace with the correct endpoint for updating an event
    const updateBody = {
      eventGroupId: eventGroupId,
      name: eventName,
      venueId: venueId,
      eventType: eventType,
      timings: timings,
      bookingAllowed: bookingAllowed,
      cancellationFee: cancellationFee,
      description: description,
      eventManagerId: eventManagerId,
      posterImgUrl: posterImgUrl,
      bannerImgUrl: bannerImgUrl,
      categoryPrices: categoryPrices
    };

    console.log('Update Request Body:', updateBody);
    
    const updateRes = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBody),
    });

    if (!updateRes.ok) {
      throw new Error("Failed to update event details");
    }

    // Second API call: Update event status
    const statusUrl = `/api/update_status?eventGroupId=${eventGroupId}`; // Replace with the correct endpoint for updating an event
    const statusBody = {
      eventGroupId: eventGroupId,
      status: eventStatus,
      isBookingAllowed: bookingAllowed,
    };

    console.log('Status Request Body:', statusBody);

    const statusRes = await fetch(statusUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusBody),
    });

    if (!statusRes.ok) {
      throw new Error("Failed to update event status");
    }

    // If both API calls are successful
    alert("Event and event status updated successfully!");
  } catch (error) {
    console.error("Error while updating event or status:", error);
    alert("Failed to update event or status. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  // Delete Event
  async function deleteEvent() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get-event-by-id?eventGroupId=${eventGroupId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
  
      alert("Event deleted successfully!");
      // Optionally, you might want to redirect or perform other actions after deletion.
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel Event
  async function handleCancelEvent() {
    try {
      setIsLoading(true);
      const url = `/api/get-event-by-id?eventGroupId=${eventGroupId}`;

      const body = {
        eventGroupId: eventGroupId,
        eventManagerId: eventManagerId,
        processRefund: true,
      };
  
      console.log('Request Body:', body);
  
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        throw new Error("Failed to cancel event");
      }

      // Set variables
      setEventStatus("CANCELED");
      setProcessRefund(true);

      alert("Event cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling event:", error);
      alert("Failed to cancel event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Venues for dropdown
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenuesData() {
      try {
        const response = await fetch('/api/venues');
        const data = await response.json();
        
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

  // Status vs Booking Allowed

  const handleEventStatusChange = (selectedEventStatus) => {
    setEventStatus(selectedEventStatus);
    updateBookingAllowed(selectedEventStatus);
  };

  const handleBookingAllowedChange = (isChecked) => {
    setBookingAllowed(isChecked);
    updateEventStatus(isChecked);
  };

  const updateBookingAllowed = (selectedEventStatus) => {
    // Update bookingAllowed based on selected event status
    switch (selectedEventStatus) {
      case "OPENED":
        setBookingAllowed(true);
        break;
      default:
        setBookingAllowed(false);
        break;
    }
  };

  const updateEventStatus = (isChecked) => {
    // Update eventStatus based on bookingAllowed
    if (isChecked) {
      setEventStatus("OPEN");
    }
  };

// Date Handling

  const handleDateSelect = (selectedDateTime) => {
    // Append the selected date and time to the array
    setTimings((prevTimings) => [...prevTimings, selectedDateTime]);
  };

  const handleDeleteDate = (index) => {
    // Remove the selected date and time from the array
    setTimings((prevTimings) =>
      prevTimings.filter((_, i) => i !== index)
    ); // Changed from setSelectedDates
  };

  // Function to handle category price change
  const handleCategoryPriceChange = (category, price) => {
    setCategoryPrices((prevPrices) => ({
      ...prevPrices,
      [category]: price
    }));
  };

  return (
    <DefaultLayout>
    <div className="bg-white p-6 rounded-md shadow-default dark:bg-boxdark">

      <h2 className="text-2xl font-semibold mb-6">Edit Event</h2>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

        {/* Left Column */}
        <div className="flex flex-col gap-9">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Event Type Dropdown */}
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select Event Type</option>
            <option value="MUSIC_CONCERT">Music Concert</option>
            <option value="THEATRE_SHOW">Theatre Show</option>
            <option value="SEMINAR">Seminar</option>
          </select>
        </div>

          {/* <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Poster
            </label>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setPosterImgUrl(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div> */}

          {/* Event Status Dropdown */}
<div>
  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
    Event Status
  </label>
  {eventStatus === "CANCELED" ? (
    <input
      type="text"
      value="Cancelled"
      disabled
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  ) : (
    <select
      value={eventStatus}
      onChange={(e) => handleEventStatusChange(e.target.value)}
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    >
      <option value="">Select Event Status</option>
      <option value="UPCOMING">Upcoming</option>
      <option value="OPENED">Open</option>
      <option value="PASSED">Passed</option>
      <option value="CLOSED">Closed</option>
    </select>
  )}
</div>


        </div>


        {/* Right Column */}
        <div className="flex flex-col gap-9">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Venue
            </label>
            <select
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select Venue</option>
              {venues.map((venueItem, key) => (
                <option key={key} value={venueItem.venueId}>
                  {venueItem.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Cancellation Fee
            </label>
            <input
              type="number"
              placeholder="Cancellation Fee"
              value={cancellationFee}
              onChange={(e) => setCancellationFee(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Banner
            </label>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setBannerImgUrl(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div> */}

        {/* Booking Allowed Checkbox */}
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Booking Allowed
          </label>
          <input
            type="checkbox"
            checked={bookingAllowed}
            onChange={(e) => handleBookingAllowedChange(e.target.checked)}
            disabled={eventStatus === "CANCELED"}
            className="rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        
        </div>
      </div>

      {/* Below the 2 columns */}
      <br></br>
      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Description
        </label>
        <textarea
          rows={6}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        ></textarea>
      </div>

      {/* DatePicker Component */}
      <div>
        <br></br>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          <DatePicker onDateSelect={handleDateSelect} />
        </label>
      </div>

      {/* Display selected timings in a table */}
<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  <div className="max-w-full overflow-x-auto">
    {timings.length === 0 ? (
      <div>
      <p className="text-center text-gray-500 dark:text-gray-400">
        No DateTime selected yet, please select DateTime and click Add DateTime
      </p>
      <br /> {/* Add line break here */}
    </div>
    ) : (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              DateTime
            </th>
            <th className="px-4 py-4 font-medium text-black dark:text-white">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {timings.map((dateTime, index) => (
            <tr key={index} className="border-b border-[#eee] dark:border-strokedark">
              <td className="px-4 py-5 dark:border-strokedark">
                {dateTime.toString()}
              </td>
              <td className="px-4 py-5 dark:border-strokedark">
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteDate(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

      {/* Category Prices Section */}
      <br></br>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Category Prices
      </label>
      
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Left Column */}
        <div>
          {Object.entries(categoryPrices).map(([category, price], index) => (
            index % 2 === 0 && (
              <div key={category} className="mb-3">
                <label className="block text-sm font-medium text-black dark:text-white">{category}</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => handleCategoryPriceChange(category, e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            )
          ))}
        </div>

        {/* Right Column */}
        <div>
          {Object.entries(categoryPrices).map(([category, price], index) => (
            index % 2 !== 0 && (
              <div key={category} className="mb-3">
                <label className="block text-sm font-medium text-black dark:text-white">{category}</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => handleCategoryPriceChange(category, e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            )
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-4"> {/* Use flex and justify-end for right alignment */}
          <Link href="/events">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleUpdateEvent}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          </Link>
          <Link href="/events">
          <button
            className="bg-danger text-white px-4 py-2 rounded-md"
            onClick={deleteEvent}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          </Link>
          <Link href="/events">
          <button
            className="bg-danger text-white px-4 py-2 rounded-md"
            onClick={handleCancelEvent}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel"}
          </button>
          </Link>
      </div>

    </div>
    </DefaultLayout>
);
};