import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, goal: "Finish writing the project report", priority: "High", completed: false },
  { id: 2, goal: "Prepare for the client presentation", priority: "Medium", completed: false },
  { id: 3, goal: "Complete the coding module for the new feature", priority: "Low", completed: false },
];

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.push(action.payload);
    },
    toggleCompletion: (state, action) => {
      const goal = state.find((g) => g.id === action.payload);
      if (goal) goal.completed = !goal.completed;
    },
    deleteGoal: (state, action) => {
      return state.filter((goal) => goal.id !== action.payload);
    },
    editGoal: (state, action) => {
      const goal = state.find((g) => g.id === action.payload.id);
      if (goal) goal.goal = action.payload.updatedGoal;
    },
  },
});

export const { addGoal, toggleCompletion, deleteGoal, editGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
