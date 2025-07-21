import TodoItem from "./TodoItem";
import { AnimatePresence } from "motion/react";

const TodoList = ({
  tasks,
  onUpdate,
  onDelete,
  editingId,
  setEditingId
}) => {
  return (
    <ul>
      <AnimatePresence>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isEditing={editingId === task.id}
            setEditingId={setEditingId}
          />        
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;