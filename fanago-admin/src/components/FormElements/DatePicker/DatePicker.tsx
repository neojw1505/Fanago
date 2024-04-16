import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";

const DatePicker = ({ onDateSelect }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const flatpickrInstance = flatpickr(inputRef.current, {
      enableTime: true,
      dateFormat: "Y-m-d H:i:S",
      static: true,
      monthSelectorType: "static",
      prevArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, [onDateSelect]);

  const handleOKButtonClick = () => {
    const selectedDate = inputRef.current._flatpickr.selectedDates[0];
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().slice(0, 19).replace('T', ' ');
      onDateSelect(formattedDate);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-black dark:text-white">
        Select date and time
      </label>
      <br />
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          placeholder="YYYY-MM-DD HH:MM:SS"
          data-class="flatpickr-right"
        />
        <button
          className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
          onClick={handleOKButtonClick}
        >
          Add DateTime
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
