import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReminder, decrementTime } from "../features/reminderSlice";
import ReminderModal from "../modals/ReminderModal";
import { PiTimerBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { MdTimer } from "react-icons/md";
import { motion } from "framer-motion";
import Modal from "../modals/Modal";

const Reminders = () => {
  const reminders = useSelector((state) => state.reminders);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedReminderTitle, setCompletedReminderTitle] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [del, setDel] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    reminders.forEach((reminder) => {
      if (reminder.timeLeft === 0) {
        setCompletedReminderTitle(reminder.title);
        setShowCompletionModal(true);
        dispatch(deleteReminder(reminder.id));
      }
    });
  }, [reminders, dispatch]);

  const handleEditReminder = (id) => {
    const reminderToEdit = reminders.find((reminder) => reminder.id === id);
    setCurrentReminder(reminderToEdit);
    setModalOpen(true);
  };

  const handleDeleteReminder = () => {
    dispatch(deleteReminder(del));
    setDeleteModalOpen(false);
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
  };

  return (
    <div className="rounded-md border bg-white p-4 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <PiTimerBold className="text-blue-600" />
          <h2 className="ml-2 text-base">Reminders</h2>
        </div>
        <button
          onClick={() => {
            setCurrentReminder(null);
            setModalOpen(true);
          }}
          className="text-sm font-medium text-blue-600"
        >
          + Add Reminder
        </button>
      </div>
      <ul className="w-full space-y-2">
        {reminders.length > 0 &&
          reminders.map((reminder) => (
            <li
              key={reminder.id}
              className="flex w-full items-center justify-between rounded border bg-gray-100 p-3 text-xs md:text-sm"
            >
              <div className="flex w-[90%] items-center">
                <span className="flex justify-between truncate text-xs text-gray-400">
                  {Math.floor(reminder.timeLeft / 60)} mins
                  <span>&nbsp;•&nbsp;&nbsp;</span>
                </span>
                <span className="w-[80%] truncate">{reminder.title}</span>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <RiDeleteBin6Line
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setDel(reminder.id)
                  }}
                  className="cursor-pointer text-red-600"
                />
              </div>
            </li>
          ))}
        {reminders.length === 0 && (
          <p className="text-sm text-gray-400">No reminders.</p>
        )}
      </ul>
      <ReminderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentReminder={currentReminder}
      />
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <motion.div
            className="w-80 rounded-lg bg-white p-8 text-center shadow-lg"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex w-full items-center justify-center text-5xl text-yellow-400">
              <MdTimer />
            </span>
            <h1 className="mt-4 text-lg font-medium">
              Reminder! Your time is up!
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {completedReminderTitle}
            </p>
            <button
              className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white"
              onClick={handleCloseCompletionModal}
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
      <Modal isOpen={isDeleteModalOpen} title="Delete Task">
        <p>Are you sure you want to delete this task?</p>
        <div>
          <button
            onClick={handleDeleteReminder}
            className="mt-2 rounded bg-red-500 px-3 py-1 text-white"
          >
            Delete
          </button>
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="ml-2 mt-4 rounded bg-blue-500 px-3 py-1 text-white"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Reminders;
