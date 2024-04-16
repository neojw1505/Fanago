// EventDropdown.tsx
import React, { useState, useEffect } from 'react';

interface EventDropdownProps {
  setEventGroupId: React.Dispatch<React.SetStateAction<number>>;
}

const EventDropdown: React.FC<EventDropdownProps> = ({ setEventGroupId }) => {
  // Updated the type to reflect the renaming from id to eventGroupId
  const [events, setEvents] = useState<{ eventGroupId: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (data.success) {
          // Assuming the backend data format has also been updated to use eventGroupId
          setEvents(data.data.data);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="mb-6">
      <span className="text-gray-600 text-lg">Select Event:</span>
      <select
        className="font-medium ml-2 bg-gray-300 p-2 rounded"
        onChange={(e) => setEventGroupId(parseInt(e.target.value))}
      >
        {events.map((event) => (
          // Using eventGroupId instead of id for the option value
          <option key={event.eventGroupId} value={event.eventGroupId}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventDropdown;
