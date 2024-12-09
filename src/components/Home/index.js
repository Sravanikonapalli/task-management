import {Component} from 'react'
import {Link} from 'react-router-dom'

import TaskDetails from '../TaskDetails'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    description:
      'Make sure to book the ticket for the 6PM show today evening to avoid last-minute rush.',
    status: 'TO DO',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    description:
      'Choose the latest Marvel movie and rent it from the nearest DVD store or online streaming platform.',
    status: 'TO DO',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    description:
      'Call the yoga studio and confirm your slot for tomorrow morning session to avoid any last-minute changes.',
    status: 'TO DO',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    description:
      'Pack the parcel carefully and drop it off at the Bloomingdale courier service before 3 PM today.',
    status: 'IN PROGRESS',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    description:
      'Log in to your Big Basket account and order a basket of fresh fruits, including apples, bananas, and oranges.',
    status: 'IN PROGRESS',
  },
  {
    id: 6,
    title: 'Fix the production issue',
    description:
      'Identify the root cause of the production issue and implement a fix to ensure smooth production operations.',
    status: 'COMPLETED',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    description:
      'Call the event organizer and confirm your slot for the Saturday night event to avoid any last-minute changes.',
    status: 'COMPLETED',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    description:
      'Buy car wash soap, sponge, and microfiber towels to ensure a thorough car wash on Sunday morning.',
    status: 'COMPLETED',
  },
]

class Home extends Component {
  state = {
    todosList: initialTodosList,
    inputValue: '',
    description: '',
    filter: 'ALL',
  }

  deleteTask = id => {
    const {todosList} = this.state
    const filteredTodos = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: filteredTodos})
  }

  changeInputValue = event => {
    this.setState({inputValue: event.target.value})
  }

  changeFilterValue = event => {
    this.setState({filter: event.target.value})
  }

  changeDesValue = event => {
    this.setState({description: event.target.value})
  }

  updateTask = (id, newTitle, newDescription) => {
    const {todosList} = this.state
    const updatedTodos = todosList.map(todo =>
      todo.id === id
        ? {...todo, title: newTitle, description: newDescription}
        : todo,
    )
    this.setState({todosList: updatedTodos})
  }

  addTodoItem = () => {
    const {inputValue, todosList, description} = this.state
    if (inputValue.trim() === '') return
    const newTaskItem = {
      id: todosList.length + 1,
      title: inputValue,
      description,
    }
    this.setState({
      todosList: [...todosList, newTaskItem],
      inputValue: '',
      description: '',
    })
  }

  render() {
    const {todosList, inputValue, description, filter} = this.state

    const filteredTodosList = todosList.filter(todo => {
      if (filter === 'ALL') return true
      return todo.status === filter
    })

    return (
      <>
        <div className="header">
          <Link to="/login">
            <button type="button" className="logout-btn">
              Logout
            </button>
          </Link>
        </div>
        <div className="app-container">
          <div className="todo-container">
            <div className="input-container">
              <input
                type="text"
                value={inputValue}
                onChange={this.changeInputValue}
                placeholder="Enter todo item"
                className="input"
              />
              <input
                type="text"
                value={description}
                onChange={this.changeDesValue}
                placeholder="Enter Description"
                className="input"
              />
              <div className="btn-con">
                <button
                  type="button"
                  className="add-btn"
                  onClick={this.addTodoItem}
                >
                  Add
                </button>
              </div>
            </div>
            <select
              value={filter}
              className="select-items"
              onChange={this.changeFilterValue}
            >
              <option value="ALL">ALL</option>
              <option value="TO DO">TO DO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <h1 className="heading">TASKS</h1>
            <ul className="task-items">
              {filteredTodosList.map(todo => (
                <TaskDetails
                  key={todo.id}
                  taskDetails={todo}
                  deleteTask={this.deleteTask}
                  updateTask={this.updateTask}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Home
