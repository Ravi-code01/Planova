import React, { useState, useEffect } from "react";
import "../fonts/stylesheet.css";
import { AiFillMacCommand } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { LuCalendarDays } from "react-icons/lu";
import { TbClipboardList } from "react-icons/tb";
import { PiTimerBold } from "react-icons/pi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { LuBellRing } from "react-icons/lu";
import { ImSearch } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import { StarFour } from "phosphor-react";
import { WiStars } from "react-icons/wi";
import {
  addTask,
  editTask,
  deleteTask,
} from "../features/taskSlice.js";
import {
  addGoal,
  toggleCompletion,
  deleteGoal,
  editGoal,
} from "../features/goalsSlice.js";

import MyTasks from "../components/MyTasks.jsx";
import Reminders from "../components/Reminders.jsx";
import Calendar from "../components/Calendar.jsx";

const Dashboard = () => {
  const userName = "Raviraj";

  const [searchTerm, setSearchTerm] = useState("");
  const currentDateStatic = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  }).format(currentDateStatic);

  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  const [newGoal, setNewGoal] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dropdownOpenT, setDropdownOpenT] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      dispatch(
        addGoal({
          id: goals.length + 1,
          goal: newGoal,
          priority: "Med",
          completed: false,
        }),
      );
      setNewGoal("");
    }
  };

  const handleEditGoal = (id) => {
    const updatedGoal = prompt(
      "Edit your goal:",
      goals.find((goal) => goal.id === id)?.goal,
    );
    if (updatedGoal !== null && updatedGoal.trim() !== "") {
      dispatch(editGoal({ id, updatedGoal }));
    }
  };
  const handleToggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  const handleToggleDropdownT = (id) => {
    setDropdownOpenT(dropdownOpenT === id ? null : id);
  };
  return (
    <div className="Geist flex h-screen w-full flex-col items-start justify-start overflow-y-auto bg-[#f5f5fc] bg-grid-pattern">
      <Sidebar />
      <main className="w-full p-4 xl:pl-[270px]">
        <div className="flex w-full flex-col items-center justify-between md:flex-row">
          <p className="w-full text-xs font-medium text-gray-600 md:text-base">
            {formattedDate}
          </p>
          <div className="Geist hidden h-10 items-center justify-center rounded-[7px] border border-[#d7d7d7] bg-white pl-2 text-sm text-gray-500 caret-gray-600 outline-none placeholder:text-[#68686F] focus:border-gray-500 sm:w-[220px] md:flex md:w-[280px] lg:w-[340px] xl:w-[420px]">
            <ImSearch className="ml-2 flex items-center justify-center text-[#68686F]" />
            <input
              maxLength={30}
              type="text"
              placeholder="Search for tasks..."
              className="flex h-full w-full items-center justify-center rounded-[7px] bg-white px-3 outline-none focus:border-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <h1 className="mb-[-4px] mt-2 text-2xl font-semibold md:text-3xl">
          Hello, {userName}
        </h1>
        <h1 className="SF-black bg-gradient-to-l from-cyan-400 via-cyan-500 to-purple-500 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
          How can I help you today?
          <WiStars
            className="mb-3 ml-1 inline-block text-cyan-600"
            size={36}
            weight="fill"
          />
        </h1>
        <div className="Geist flex h-10 w-full items-center justify-center rounded-[7px] border border-[#d7d7d7] bg-white pl-2 text-sm text-gray-500 caret-gray-600 outline-none placeholder:text-[#68686F] focus:border-gray-500 md:hidden md:w-[280px] lg:w-[340px] xl:w-[420px]">
          <ImSearch className="ml-2 flex items-center justify-center text-[#68686F]" />
          <input
            maxLength={30}
            type="text"
            placeholder="Search for tasks..."
            className="flex h-full w-full items-center justify-center rounded-[7px] bg-white px-3 outline-none focus:border-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 w-full flex-col items-start gap-4 lg:flex lg:flex-row">
          <div className="flex w-full flex-col lg:w-[50%] 2xl:w-[55%]">
            <MyTasks />
            <div className="mt-4 h-auto w-full rounded-[10px] border-2 border-[#EDEDEE] bg-white p-2 py-3 md:h-auto md:p-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <GoGoal className="text-blue-600" />
                  <span className="ml-2 text-base">Today's Top 3 Goals</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 px-2">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`flex w-full items-center rounded-md border p-2 ${
                      goal.completed
                        ? "bg-gray-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex w-[90%] items-center md:w-[80%]">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => dispatch(toggleCompletion(goal.id))}
                        className="mr-2"
                      />
                      <span
                        className={`truncate text-xs md:text-sm ${
                          goal.completed ? "text-gray-400 line-through" : ""
                        }`}
                      >
                        {goal.goal}
                      </span>
                    </div>

                    <div className="flex w-[10%] items-center justify-end text-right">
                      <div className="relative">
                        <SlOptionsVertical
                          className="cursor-pointer text-gray-500"
                          size={14}
                          onClick={() => handleToggleDropdown(goal.id)}
                        />
                        {dropdownOpen === goal.id && (
                          <div className="absolute right-0 z-10 mt-1 w-24 space-y-2 rounded-md border bg-white p-2 text-xs shadow-lg">
                            <button
                              onClick={() => {
                                handleEditGoal(goal.id);
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                dispatch(deleteGoal(goal.id));
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                dispatch(toggleCompletion(goal.id));
                                setDropdownOpen(null);
                              }}
                              className="block w-full px-2 py-1 text-left text-gray-700 hover:bg-gray-100"
                            >
                              Complete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 w-full lg:mt-0 lg:w-[50%] 2xl:w-[45%]">
            <Reminders />
            <Calendar/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
