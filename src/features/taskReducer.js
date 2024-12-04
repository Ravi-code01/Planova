// tasksReducer.js
const initialState = {
    tasks: [
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
  };
  
  const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case 'EDIT_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload.id ? { ...task, ...action.payload } : task
          ),
        };
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
      case 'REORDER_TASKS':
        const { originalPos, newPos } = action.payload;
        const reorderedTasks = [...state.tasks];
        const [movedTask] = reorderedTasks.splice(originalPos, 1);
        reorderedTasks.splice(newPos, 0, movedTask);
        return {
          ...state,
          tasks: reorderedTasks,
        };
      default:
        return state;
    }
  };
  
  export default tasksReducer;