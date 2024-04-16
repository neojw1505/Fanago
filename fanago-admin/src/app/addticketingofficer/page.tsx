"use client";
import React from "react";
import EventsForm from "@/components/TicketingOfficerForm/TicketingOfficerForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const AddEvents = () => {
  return (
    <DefaultLayout>
      <div>
        <EventsForm />
      </div>
    </DefaultLayout>
  );
};

export default AddEvents;