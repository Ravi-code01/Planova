import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "./features/goalsSlice";
import tasksReducer from "./features/taskSlice";
import reminderReducer from "./features/reminderSlice";

const store = configureStore({
  reducer: {
    goals: goalsReducer,
    tasks: tasksReducer,
    reminders: reminderReducer,
  },
});

export default store;
