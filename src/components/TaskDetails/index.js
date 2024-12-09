import {useState} from 'react'

import './index.css'

const TaskDetails = props => {
  const {taskDetails, deleteTask, updateTask} = props

  const {id, title, description} = taskDetails

  const [isEditing, setISEditing] = useState(false)
  const [textEdit, setTextEdit] = useState(title)

  const handleDeleteTask = () => {
    deleteTask(id)
  }

  const handleEditText = () => {
    setISEditing(true)
  }

  const handleSaveText = () => {
    updateTask(id, textEdit, description)
    setISEditing(false)
  }

  const handleInputChange = event => {
    setTextEdit(event.target.value)
  }

  return (
    <li className="todo-item">
      <div className="title-and-button-con">
        {isEditing ? (
          <input
            type="text"
            value={textEdit}
            onChange={handleInputChange}
            className="edit-title"
          />
        ) : (
          <p className="todo-text">{title}</p>
        )}
        <div className="buttons-con">
          {isEditing ? (
            <button
              type="button"
              onClick={handleSaveText}
              className="save-button"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditText}
              className="edit-button"
            >
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteTask}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="description">{description}</p>
      <hr className="hr-line" />
    </li>
  )
}

export default TaskDetails
