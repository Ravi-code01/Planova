import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

const Tasks = ({ tasks }) => {
  return (
    <div className="space-y-2 mt-4 px-2">
      <SortableContext items={tasks.map((task) => task.id)}  strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Tasks;
