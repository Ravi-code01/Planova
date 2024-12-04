import React, { useState } from "react";
import { TbClipboardList } from "react-icons/tb";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { PiStarFourFill } from "react-icons/pi";
import Tasks from "./Tasks.jsx";
import { SlOptionsVertical } from "react-icons/sl";
import Modal from "../modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editTask,
  deleteTask,
  reorderTasks,
} from "../features/taskSlice.js"; // Adjust the import path as necessary

const MyTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    priority: "",
    dueDate: "",
    status: "",
  });
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low", // Default priority
    dueDate: new Date().toISOString().split("T")[0], // Default to today
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);
    dispatch(reorderTasks({ oldIndex, newIndex }));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  const toggleDropdown = (taskId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleEditClick = (task) => {
    setEditTaskData(task);
    setEditModalOpen(true);
    setDropdownOpen((prev) => ({ ...prev, [task.id]: false }));
  };

  const handleDeleteClick = (taskId) => {
    setSelectedTask(taskId);
    setDeleteModalOpen(true);
    setDropdownOpen((prev) => ({ ...prev, [taskId]: false }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.title) {
      dispatch(
        addTask({
          id: Date.now(), // Use a unique ID generator in production
          title: newTask.title,
          priority: newTask.priority,
          dueDate: newTask.dueDate,
          status: "Upcoming",
        }),
      );
      setNewTask({
        title: "",
        priority: "Low",
        dueDate: new Date().toISOString().split("T")[0],
      });
      setAddModalOpen(false);
    }
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    dispatch(editTask({ id: editTaskData.id, ...editTaskData }));
    setEditModalOpen(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(selectedTask));
    setDeleteModalOpen(false);
  };

  const handleCompleteTask = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      dispatch(editTask({ ...taskToComplete, status: "Completed" }));
    }
    setDropdownOpen(false);
  };

  return (
    <div className="md:min-h-84 h-auto w-full rounded-[10px] border-2 border-[#EDEDEE] bg-white p-2 py-3 md:p-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center">
          <TbClipboardList className="text-blue-600" />
          <span className="ml-2 text-base">My Tasks</span>
        </div>
        <div>
          <button
            className="text-sm font-medium text-blue-600"
            onClick={() => setIsReorderMode((prev) => !prev)}
          >
            {isReorderMode ? "Exit Reorder" : "Reorder"}
          </button>
          <button
            className="ml-4 text-sm font-medium text-blue-600"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Task
          </button>
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
            title="Add New Task"
          >
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Task Name"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="mb-2 mt-2 w-full bg-gray-100 text-sm border p-2"
                required
              />
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="mb-2 w-full bg-gray-100 text-sm border p-2"
              >
                <option value="Low">Low</option>
                <option value="Med">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="mb-2 w-full border text-sm p-2"
                required
              />
              <button
                type="submit"
                className="mt-2 rounded text-sm bg-blue-500 px-3 py-1 text-white"
              >
                Add Task
              </button>
              <button
                onClick={() => setAddModalOpen(false)}
                className="ml-2 mt-4 rounded text-sm bg-blue-500 px-3 py-1 text-white"
              >
                Close
              </button>
            </form>
          </Modal>
        </div>
      </div>
      <div className="my-2 mt-4 flex w-full items-center overflow-y-auto px-2">
        {["All", "In Progress", "Upcoming", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`mr-2 rounded-md p-1 px-2 text-xs font-medium ${filter === status ? "bg-gradient-to-l from-cyan-400 to-purple-500 text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {status}
          </button>
        ))}
      </div>
      {isReorderMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <Tasks tasks={filteredTasks} />
        </DndContext>
      ) : (
        <div className="mt-2 space-y-2 p-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex w-full items-center justify-between rounded-md border p-2 ${
                task.status === "Completed"
                  ? "bg-gray-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex w-[80%] items-center md:w-[90%]">
                <span className="pl-1 pr-2 text-[10px] text-gray-400">
                  <PiStarFourFill />
                </span>
                <span
                  className={`mr-2 rounded-[5px] px-1 py-1 text-[10px] text-gray-400 ${
                    task.priority === "High"
                      ? "border border-red-700 bg-red-100 text-red-600"
                      : task.priority === "Med"
                        ? "border border-yellow-500 bg-yellow-100 text-yellow-700"
                        : "border border-green-600 bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
                <span
                  className={`truncate text-xs md:text-sm ${
                    task.status === "Completed"
                      ? "text-gray-400 line-through"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <span className="ml-2 truncate text-[10px] text-gray-500">
                {formatDueDate(task.dueDate)}
              </span>
              <div className="relative text-xs">
                <SlOptionsVertical
                  className="cursor-pointer text-xs text-gray-500"
                  size={14}
                  onClick={() => toggleDropdown(task.id)}
                />
                {dropdownOpen[task.id] && (
                  <div className="absolute right-0 top-2 z-10 mt-1 w-24 space-y-2 rounded-md border bg-white shadow-lg">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="block w-full p-3 pb-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task.id)}
                      className="block w-full p-3 pt-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="block w-full p-3 pt-1 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isEditModalOpen} title="Edit Task">
        <form onSubmit={handleEditTask}>
          <input
            type="text"
            value={editTaskData.title}
            onChange={(e) =>
              setEditTaskData({ ...editTaskData, title: e.target.value })
            }
            className="color-gray-600 mt-2 w-full rounded-md border bg-gray-100 p-2 text-sm"
          />
          <div>
            <button
              type="submit"
              className="mt-2 rounded bg-blue-500 px-3 py-1 text-white"
            >
              Save
            </button>
            <button
              onClick={() => setEditModalOpen(false)}
              className="ml-2 mt-4 rounded bg-blue-500 px-3 py-1 text-white"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} title="Delete Task">
        <p>Are you sure you want to delete this task?</p>
        <div>
          <button
            onClick={handleDeleteTask}
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

export default MyTasks;
