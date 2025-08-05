import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, editTask } from './redux/ToDoSlice'

function App() {
  const [value, setValue] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState("")

  const tasks = useSelector((state) => state.todo.tasks)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (value.trim()) {
      dispatch(addTask(value))
      setValue("")
    }
  }

  const handleEdit = (index) => {
    dispatch(editTask({ index, newTask: editValue }))
    setEditIndex(null)
    setEditValue("")
  }

  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={handleAdd}>Add Task</button>

      <h2>Tasks</h2>
      {tasks.map((t, index) => (
        <li key={index}>
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleEdit(index)}>Save</button>
              <button onClick={() => {
                setEditIndex(null)
                setEditValue("")
              }}>Cancel</button>
            </>
          ) : (
            <>
              {t}
              <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
              <button onClick={() => {
                setEditIndex(index)
                setEditValue(t)
              }}>Edit</button>
            </>
          )}
        </li>
      ))}
    </div>
  )
}

export default App
