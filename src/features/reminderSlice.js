import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
  name: "reminders",
  initialState: [
    {
      id: 1,
      title: "Assess any new risks identified in the meeting.",
      timeLeft: 20,
    },
    {
      id: 2,
      title: "Prepare presentation slides for team briefing.",
      timeLeft: 300,
    },
    {
      id: 3,
      title: "Review quarterly financial reports.",
      timeLeft: 500,
    },
  ],
  reducers: {
    addReminder: (state, action) => {
      state.push(action.payload);
    },
    editReminder: (state, action) => {
      const index = state.findIndex((reminder) => reminder.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteReminder: (state, action) => {
      return state.filter((reminder) => reminder.id !== action.payload);
    },
    decrementTime: (state) => {
      return state
        .filter((reminder) => reminder.timeLeft > 0)
        .map((reminder) => ({
          ...reminder,
          timeLeft: reminder.timeLeft - 1,
        }));
    },
  },
});

export const { addReminder, editReminder, deleteReminder, decrementTime } =
  reminderSlice.actions;

export default reminderSlice.reducer;
