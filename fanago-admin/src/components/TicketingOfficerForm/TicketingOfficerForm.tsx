import React, { useState } from "react";
import AlertBox from "@/components/AlertBox/AlertBox";

const EventsForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setstatus] = useState("");
  const [message, setmessage] = useState("");



  // Function to handle form submission
  const handleAddTicketingOfficer = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    try {
      const payload = {
        username: username,
        email: email,
        phoneNumber: phone,
      };

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      const data = await response.json();
      console.log("Data response:", data);
      console.log(data.status);

      if (data.status=="success"){
      setstatus(data.status + "!");
      } else{
        setstatus(data.status + "! " + data.message);
      }



    } catch (error) {
      console.error("Error:", error);
    }


  };
  
  const closeAlert = () => {
    setstatus("");
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-default dark:bg-boxdark">
      <h2 className="text-2xl font-semibold mb-6">Add Ticketing Officer</h2>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-9">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Phone
            </label>
            <input
              type="number"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${phone && phone.length !== 8 && "border-red-500"
                }`}
            />
            {phone && phone.length !== 8 && (
              <p className="text-red-500">Please enter a valid phone number</p>
            )}
          </div>

        </div>
        {/* Right Column */}
        <div className="flex flex-col gap-9">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${email && (!email.includes("@") || !email.includes(".com")) && "border-red-500"
                }`}
            />
            {email && (!email.includes("@") || !email.includes(".com")) && (
              <p className="text-red-500">Please enter a valid email</p>
            )}
          </div>
        </div>
      </div>
      {/* Below the 2 columns */}
      <br />
      <div className="flex justify-end">
        {/* Use flex and justify-end for right alignment */}
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={handleAddTicketingOfficer} // Call the function on button click
        >
          Add Ticketing Officer
        </button>
        {status != "" && <AlertBox message={status} onClose={closeAlert} />}
      </div>
    </div>
  );
};

export default EventsForm;
