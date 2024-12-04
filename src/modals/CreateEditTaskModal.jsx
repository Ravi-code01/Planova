import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/taskSlice";

const CreateEditTaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(taskToEdit?.name || "");
  const [taskPriority, setTaskPriority] = useState(taskToEdit?.priority || "Low");

  const handleSave = () => {
    if (taskToEdit) {
      dispatch(editTask({ ...taskToEdit, name: taskName, priority: taskPriority }));
    } else {
      dispatch(addTask({ id: Date.now(), name: taskName, priority: taskPriority, completed: false }));
    }
    onClose();
  };

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{taskToEdit ? "Edit Task" : "Create Task"}</h3>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Med">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateEditTaskModal;
