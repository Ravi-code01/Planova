import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReminder, editReminder } from "../features/reminderSlice";

const ReminderModal = ({ isOpen, onClose, currentReminder }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(currentReminder?.title || "");
  const [timeLeft, setTimeLeft] = useState(currentReminder?.timeLeft || 0);

  const handleSave = () => {
    if (currentReminder) {
      dispatch(editReminder({ id: currentReminder.id, title, timeLeft }));
    } else {
      dispatch(addReminder({ id: Date.now(), title, timeLeft }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{zIndex: 100}} className="fixed p-8 sm:p-0 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="w-full sm:w-96 rounded bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg">
          {currentReminder ? "Edit" : "Add"} Reminder
        </h2>
        <input
          type="text"
          maxLength={50}
          className="mb-4 w-full border p-2"
          placeholder="Reminder title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="mb-4 w-full border p-2"
          placeholder="Time Left (in seconds)"
          value={timeLeft}
          onChange={(e) => setTimeLeft(Number(e.target.value))}
        />
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={handleSave}
        >
          Save
        </button>
        <button className="ml-2 text-gray-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReminderModal;
