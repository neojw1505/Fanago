"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import AlertBox from "@/components/AlertBox/AlertBox";

const TicketingOfficersPage = () => {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setticketData] = useState([]);
  const [ticketSeatsData, setticketSeatsData] = useState([]);
  const [eventId, seteventId] = useState("");
  const [eventdateTime, seteventdateTime] = useState("");
  const [status, setstatus] = useState("");
  const [message, setmessage] = useState("");
  const [errorr, seterror] = useState("");





  const verifyTicket = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    try {
      // Check if the ticketId is empty
      if (!ticketId.trim()) {
        // If empty, display an error message and return early
        setmessage("Input cannot be empty");
        seterror("error");
        return;
      }

      const payload = {
        ticketId: ticketId
      };

      const response = await fetch("/api/verify-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      if (data.status == "error") {
        console.log("aeyo");
        seterror(data.status);
        setmessage(data.message);

        throw new Error("Invalid ticket");
      }



      setticketData(data.data.data);
      seteventId(data.data.data.eventGroupDetail.eventGroup.name);
      seteventdateTime(data.data.data.eventGroupDetail.dateTime);
      setstatus(data.data.data.status);
      setticketSeatsData(data.data.data.ticketSeats);
    } catch (err) {
      console.error("Caught error:", err);
      console.log(errorr);
      // console.log(data.status);  
      console.log("aeyo2");

    }
  };

  const closeAlert = () => {
    seterror("");
  };


  const redeemTicket = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    try {
      const payload = {
        ticketId: ticketId
      };

      const response = await fetch("/api/redeem-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to redeem ticket");
      }

      const data = await response.json();
      console.log("Ticket data retrived:", data);

    } catch (err) {
      console.error("Error:", err);
    }
  };





  return (
    <DefaultLayout>
      <h1 className="text-3xl font-semibold pb-5">Ticket Validity</h1>
      <div className="flex flex-col bg-bodydark1">
        {/*------------- barcode search -------------*/}
        <div className="flex w-1/2">
          <form className="flex flex-col w-full m-6">
            <span className="font-extrabold">Check Barcode</span>
            <div className="flex mt-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  id="search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="scan ticket barcode"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  required
                />
              </div>
              <div className="relative flex-grow max-w-30">
                <button
                  type="submit"
                  className="w-full py-2.5 px-6 ms-2 text-sm font-medium bg-black text-white rounded-md border-black hover:bg-opacity-50 transition duration-300 cursor-pointer"
                  onClick={verifyTicket}>
                  check
                </button>
                {errorr && <AlertBox message={message} onClose={closeAlert} />}
              </div>
            </div>
          </form>
        </div>
        {/*------------- end of barcode search -------------*/}
        <div className="span">
          {/* <TicketTable /> */}
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>

                  <tr className="bg-gray-2 dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center xl:pl-11">
                      Event Name
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center xl:pl-11">
                      Event Time
                    </th>
                    <th className=" px-4 py-4 font-medium text-black dark:text-white text-center xl:pl-11">
                      Status
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center xl:pl-11">
                      Seat
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white text-center xl:pl-11">
                      Actions
                    </th>
                  </tr>
                </thead>


                <tbody>
                  {ticketSeatsData.map((ticketSeats, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {eventId}
                        </h5>
                      </td>


                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center xl:pl-11">
                        {
                          (() => {
                            const formattedDate = new Date(eventdateTime);
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
                              <p className="text-black dark:text-white" key={eventdateTime} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {formattedDateTime}
                              </p>
                            );
                          })()
                        }
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center xl:pl-11">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${status === 'ACTIVE'
                            ? 'bg-success text-success'
                            : status === 'REDEEMED'
                              ? 'bg-primary text-primary'
                              : 'bg-danger text-danger'
                            }`}
                        >
                          {status}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                        <tr>
                          <td className="border-b border-[#eee] pr-2 dark:border-strokedark">
                            <strong>Category:</strong>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark text-center">
                            {ticketSeats.seat.category}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b border-[#eee]  dark:border-strokedark ">
                            <strong>Seat Row:</strong>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark text-center">
                            {ticketSeats.seat.seatRow}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b border-[#eee] pr-2 dark:border-strokedark">
                            <strong>Seat Column:</strong>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark text-center">
                            {ticketSeats.seat.seatCol}
                          </td>
                        </tr>

                      </td>


                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-center xl:pl-11">
                        {/* Conditional button rendering */}
                        {status == 'ACTIVE' && (
                          <button
                            type="submit"
                            className="py-2.5 px-6 text-sm font-medium bg-black text-white rounded-md border-black hover:bg-opacity-50 transition duration-300 cursor-pointer"
                            onClick={(e) => {
                              redeemTicket(e);
                              verifyTicket(e);
                          }}>
                            Redeem All Tickets
                          </button>
                        )}{errorr && <AlertBox message={message} onClose={closeAlert} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
};

export default TicketingOfficersPage;
