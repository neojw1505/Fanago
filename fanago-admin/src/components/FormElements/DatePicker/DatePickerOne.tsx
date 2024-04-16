// components/FormElements/DatePicker/DatePickerOne.tsx
import flatpickr from "flatpickr";
import { useEffect } from "react";

const DatePickerOne = () => {
  useEffect(() => {
    // Your flatpickr initialization code goes here
    const datePicker = flatpickr("#datepicker-one", {
      // Your flatpickr options go here
    });

    // Cleanup the flatpickr instance when the component is unmounted
    return () => {
      datePicker.destroy();
    };
  }, []);

  return (
    <input
      id="datepicker-one"
      type="text"
      placeholder="Select Date"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
  );
};

export default DatePickerOne;
