import { useState, useRef } from "react";
import React from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { EllipsisVerticalIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { motion } from "motion/react";

const TodoItem = ({
  task,
  onUpdate,
  onDelete,
  isEditing,
  setEditingId
}) => {
  const [formText, setFormText] = useState(task.text);
  const inputRef = useRef(null);

  const handleSave = () => {
    const cleanFormText = formText.trim();
    if(cleanFormText !== "") {
      onUpdate(task.id, { text: cleanFormText })
    }

    setEditingId(null);
  }

  const toggleForm = (taskId=null, taskText="") => { 
    setEditingId(taskId);
    setFormText(taskText);
    
    if(taskId !== null){
      setTimeout(() => {
        inputRef.current.focus(); 
      }, 100);  
    }
  }

  return (
    <motion.li 
      className={`w-full mb-3 px-4 py-4 shadow-sm bg-white border rounded-lg ${task.isComplete ? 'border-emerald-600 shadow-emerald-100' : 'border-slate-200'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 40 }}
      transition={{ duration: 0.1 }}
      >

      {isEditing ? (
        <div className='w-full'>
          <div className="w-full flex items-center pb-2 border-b-1 border-gray-400">
            <input
              ref={inputRef}
              value={formText}
              onChange={e => setFormText(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') handleSave();
                if(e.key === 'Escape') toggleForm();
              }}
              placeholder='Add new todo'
              className='flex-1 border-none focus:outline-none focus:ring-0 focus:border-transparent pe-4'
            />
            <button onClick={handleSave} type="button" className=" bg-emerald-600 hover:bg-emerald-800 focus:outline-none focus:ring-none rounded-lg p-1 cursor-pointer me-2">
              <CheckIcon className="size-5 fill-white" />
            </button>
            <button type="button" className=" bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-none rounded-lg p-1 cursor-pointer" onClick={toggleForm}>
              <XMarkIcon className="size-5 fill-white" />
            </button>
          </div>
        </div> 
      ) : (
        <div className='w-full flex items-center'>
          <label className="flex items-center cursor-pointer relative">
            <input 
              type="checkbox" 
              checked={task.isComplete} 
              onChange={() => onUpdate(task.id, { isComplete: !task.isComplete })} 
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-emerald-600 checked:border-emerald-600" />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </span>
          </label>
          
          <div className='px-4 text-left flex-1 items-center'>
            <span 
              className={`block leading-[1] tracking-wide ${task.isComplete ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {task.text}
            </span>
          </div>
          <Menu>
            <MenuButton className="border-none bg-none">
              <EllipsisVerticalIcon className="size-5 fill-gray-900" />
            </MenuButton>

            <MenuItems
              transition
              anchor="right start"
              className="origin-top-right rounded-xl border border-gray-400 bg-white p-1 text-sm/6 text-gray-900 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <MenuItem>
                <button onClick={() => toggleForm(task.id, task.text)} 
                  className="group flex w-full items-center gap-2 rounded-lg px-4 py-2 data-focus:bg-white/10">
                  <PencilIcon className="size-4 fill-gray-900" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button onClick={() => onDelete(task.id)} className="group flex w-full items-center gap-2 rounded-lg px-4 py-2 data-focus:bg-white/10 text-red-700">
                  <TrashIcon className="size-4 fill-red-700" />
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
              
          </Menu>
        </div>
      )

      }

    </motion.li>
  );
}

export default React.memo(TodoItem);