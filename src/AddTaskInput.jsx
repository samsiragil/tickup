import { useState } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";

const AddTaskInput = ({onAdd}) => {
  const [newTask, setNewTask] = useState('');

   const addTask = () => {
    if (!newTask.trim()) return;
    
    onAdd(newTask.trim());
    setNewTask("");
  };

  const handleKeyDown = (event) => {
    if(event.key !== 'Enter') return;
    addTask();
  }

  return (
    <div className='flex w-full mb-10 border-b-2 pb-3 border-gray-400'>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Add new todo'
        className='flex-1 border-none focus:outline-none focus:ring-0 focus:border-transparent pr-4'
      />
      <button type="button" disabled={newTask.trim() === ""} className={`bg-emerald-600 focus:outline-none focus:ring-none rounded-lg p-2.5 ${newTask.trim() === "" ? 'opacity-50 cursor-not-allowed' : ' hover:bg-emerald-800 cursor-pointer'}`} onClick={addTask}>
        <PlusIcon className="size-6 fill-white" />
      </button>
    </div>
  );
}

export default AddTaskInput;