import React from "react";
import { useDispatch } from "react-redux";
import { filterTasks } from "../features/taskSlice.js";

const TaskFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(filterTasks(e.target.value));
  };

  return (
    <div className="task-filter">
      <label>Filter Tasks</label>
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
