import flatpickr from "flatpickr";
import { useEffect, useRef, useState } from "react";

const DatePickerTwo = ({ onDateSelect }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const flatpickrInstance = flatpickr(inputRef.current, {
      enableTime: true,
      dateFormat: "Y-m-d H:i:S",
      static: true,
      monthSelectorType: "static",
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      onChange: function (selectedDates, dateStr, instance) {
        // Trigger the callback with the selected date and time
        onDateSelect(selectedDates[0]);
      },
    });

    return () => {
      // Cleanup flatpickr instance on component unmount
      flatpickrInstance.destroy();
    };
  }, [onDateSelect]);

  return (
    <div>
      <label className="block text-sm font-medium text-black dark:text-white">
        Select date and time
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="YYYY-MM-DD HH:MM:SS"
          data-class="flatpickr-right"
        />
      </div>
    </div>
  );
};

export default DatePickerTwo;
