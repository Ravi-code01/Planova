import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      eventName: "Team Meeting",
      date: new Date(2024, 11, 15),
      color: "orange",
    },
    {
      eventName: "Project Deadline",
      date: new Date(2024, 11, 6),
      color: "red",
    },
    {
      eventName: "Birthday Party",
      date: new Date(2024, 11, 27),
      color: "blue",
    },
    {
      eventName: "Community Workshop",
      date: new Date(2024, 11, 10),
      color: "green",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getDayClass = (day) => {
    const hasEvents = events.some(
      (event) => format(event.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"),
    );
    const classes = ["day", isToday(day) ? "today" : ""];
    if (hasEvents) {
      classes.push("has-events");
    }
    return classes.join(" ");
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const renderDays = () => {
    return daysInMonth.map((day) => {
      return (
        <div
          key={day}
          className={getDayClass(day)}
          onClick={() => handleDayClick(day)}
        >
          <div className="day-name">{format(day, "EEE")}</div>
          <div className="day-number">{format(day, "d")}</div>
        </div>
      );
    });
  };

  const renderEvents = () => {
    if (!selectedDate) return null;
    const dayEvents = events.filter(
      (event) =>
        format(event.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
    );
    return (
      <div className="mt-4 border-t border-gray-300 p-2 text-xs">
        <h3 className="my-1 text-gray-400">
          Events for : {format(selectedDate, "dd MMM")}
        </h3>
        {dayEvents.length > 0 ? (
          dayEvents.map((event, index) => (
            <div key={index} className="flex items-center text-sm">
              <span
                className={`event mr-2 rounded-full bg-gray-400 text-lg`}
              ></span>
              <span className="px-1">{event.eventName}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center text-sm">No Events</div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4 h-auto w-full rounded-[10px] border-2 border-[#EDEDEE] bg-white p-4">
      <div className="ml-1 flex items-center justify-between">
        <div className="mr-4 flex items-center">
          <LuCalendarDays className="text-blue-600" />
          <span className="ml-2 text-base">Calendar</span>
        </div>
        <div className="flex items-center">
          <button onClick={handlePrevMonth} className="text-gray-600">
            <IoCaretBack />
          </button>
          <span className="mx-2 text-sm font-medium">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <button onClick={handleNextMonth} className="text-gray-600">
            <IoCaretForwardOutline />
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">{renderDays()}</div>
      {renderEvents()}
    </div>
  );
};

export default Calendar;
