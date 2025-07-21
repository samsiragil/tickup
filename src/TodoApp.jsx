import { useState, useEffect } from 'react'
import AddTaskInput from './AddTaskInput';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = "todoApp.tasks";

const TodoApp = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTasks){
      setTasks(storedTasks)
    }
    setHasMounted(true);
  }, []);
  
  useEffect(() => {
    if(hasMounted){
      localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasks));
    }
  }, [tasks]);
  
  const addTask = (newText) => {
    const newTask = {
      id: Date.now(), 
      text: newText, 
      isComplete: false
    }
    
    setTasks(prev => [...prev, newTask]);
  }
  
  const updateTask = (id, updatedFields) => {
    setTasks((prev) => 
       prev.map((task) => 
        task.id === id ? { ...task, ...updatedFields } : task
       ) 
    );
  };
  
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <h2 className="text-gray-800 text-3xl font-bold mb-10">Your Todo List</h2>
        <AddTaskInput onAdd={addTask} />
        <TodoList
          tasks={tasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  )
}

export default TodoApp;