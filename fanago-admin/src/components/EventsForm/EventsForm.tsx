"use client";
import React, { useState, useEffect} from "react";
import Link from 'next/link';
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";

const EventsForm = () => {
  
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

  // Images Fields
  const [bannerImage, setBannerImage] = useState(null);
  const [posterImage, setPosterImage] = useState(null);

  // Function to log the body for testing
  const logRequestBody = () => {
    const body = {
      eventName: eventName,
      venueId: venueId,
      eventType: eventType,
      timings: timings,
      bookingAllowed: bookingAllowed,
      // eventTypeId: eventTypeId,
      cancellationFee: cancellationFee,
      description: description,
      eventManagerId: eventManagerId,
      posterImgUrl: posterImgUrl,
      bannerImgUrl: bannerImgUrl,
      categoryPrices: categoryPrices
    };
  };

  const [isAddingEvent, setIsAddingEvent] = useState(false)

  // Calling API for Add Event (POST & PATCH)
  const handleAddEvent = async () => {
    try {
      setIsAddingEvent(true); // Set flag to true when adding event
  
      // Prepare body for POST request for adding event
      const body = {
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
  
      // Submit event details first
      const eventRes = await fetch("/api/add_events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      if (!eventRes.ok) {
        throw new Error("Failed to add event");
      }
  
      // Optional: fetch the ID of the newly created event if needed for image upload
      const eventData = await eventRes.json();
      const eventGroupId = eventData.data.data.eventGroupId; // Assuming your API returns the ID as `eventId`

      // Check if images are provided and upload them
      if (bannerImage || posterImage) {
        const formData = new FormData();
        formData.append('eventGroupId', eventGroupId);
    
        if (bannerImage) {
            console.log('Appending bannerImage:', bannerImage.name, bannerImage.size);
            formData.append('bannerImage', bannerImage);
        } else {
            console.log('No bannerImage to append');
        }
    
        if (posterImage) {
            console.log('Appending posterImage:', posterImage.name, posterImage.size);
            formData.append('posterImage', posterImage);
        } else {
            console.log('No posterImage to append');
        }
    
        const imageRes = await fetch(`/api/upload_image`, {
            method: 'PATCH',
            body: formData,
        });
    
        if (!imageRes.ok) {
            throw new Error('Failed to upload images');
        }
    }
  
      alert("Event and images added successfully!");
      // Reset fields and states if needed here

      // Reset form fields after successful submission
      setEventName("");
      setVenueId("");
      setEventType("");
      setTimings([]);
      setBookingAllowed(false);
      // setEventTypeId("");
      setCancellationFee("");
      setDescription("");
      setPosterImgUrl("");
      setBannerImgUrl("");
      setCategoryPrices({
        CAT1: '',
        CAT2: '',
        CAT3: '',
        CAT4: ''
      });

    } catch (error) {
      console.error("Error during the event and image addition process:", error);
      alert("Failed to add event and/or images. Please try again.");
    } finally {
      setIsAddingEvent(false);
    }
  };

  // Fetch Venues

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
      case "OPEN":
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
    } else {
      setEventStatus("");
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
    <div className="bg-white p-6 rounded-md shadow-default dark:bg-boxdark">

      <h2 className="text-2xl font-semibold mb-6">Add Event</h2>

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

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Poster
            </label>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setPosterImage(e.target.files[0])}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Event Status Dropdown */}
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Event Status
          </label>
          <select
            value={eventStatus}
            onChange={(e) => handleEventStatusChange(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select Event Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="OPEN">Open</option>
            <option value="PASSED">Passed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="CLOSED">Closed</option>
          </select>
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

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Banner
            </label>
            <input
              type="file"
              placeholder="Image"
              onChange={(e) => setBannerImage(e.target.files[0])}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

        {/* Booking Allowed Checkbox */}
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Booking Allowed
          </label>
          <input
            type="checkbox"
            checked={bookingAllowed}
            onChange={(e) => handleBookingAllowedChange(e.target.checked)}
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

      <div className="flex justify-end"> {/* Use flex and justify-end for right alignment */}
          <Link href="/events">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleAddEvent}
          >
            Add Event
          </button> 
          </Link>
          
      </div>
    </div>

);
};

export default EventsForm;
