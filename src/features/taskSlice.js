import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",

  initialState: [
    {
      id: 1,
      title: "Add tests to homepage",
      priority: "High",
      dueDate: "2023-10-15",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Fix styling in about section",
      priority: "Med",
      dueDate: "2023-10-20",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Learn how to center a div",
      priority: "Low",
      dueDate: "2023-10-25",
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Implement Redux in the project",
      priority: "High",
      dueDate: "2023-10-30",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Write documentation for the project",
      priority: "Med",
      dueDate: "2023-11-05",
      status: "Completed",
    },
  ],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    reorderTasks: (state, action) => {
      const { oldIndex, newIndex } = action.payload;

      // Move the task in the array
      const [movedTask] = state.splice(oldIndex, 1);
      state.splice(newIndex, 0, movedTask);

      // Update the sequence values
      state.forEach((task, index) => {
        task.sequence = index + 1; // Update sequence based on new order
      });
    },
  },
});

export const { addTask, editTask, deleteTask, reorderTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
