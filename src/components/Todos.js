import {useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {MdDelete} from 'react-icons/md'
import './Todos.css'

const Todos = () => {
  const [todoList, setTodoList] = useState([])
  const [userInput, setUserInput] = useState('')
  const [userDescriptionInput, setUserDescriptionInput] = useState('')
  const [todosCount, setTodosCount] = useState(0)

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || []
    setTodoList(storedTodoList)
    setTodosCount(storedTodoList.length)
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  const notify = message => {
    toast(message, {type: 'error'})
  }

  const handleAddTodo = () => {
    if (userInput === '') {
      notify('Enter Valid Text')
      return
    }

    const newTodo = {
      text: userInput,
      textDescription: userDescriptionInput,
      uniqueNo: todosCount + 1,
      isChecked: false,
    }

    setTodoList(prevTodoList => [...prevTodoList, newTodo])
    setTodosCount(prevCount => prevCount + 1)
    setUserInput('')
    setUserDescriptionInput('')
  }

  const handleTodoStatusChange = todoId => {
    setTodoList(prevTodoList =>
      prevTodoList.map(todo =>
        todo.uniqueNo === todoId ? {...todo, isChecked: !todo.isChecked} : todo,
      ),
    )
  }

  const handleDeleteTodo = todoId => {
    setTodoList(prevTodoList =>
      prevTodoList.filter(todo => todo.uniqueNo !== todoId),
    )
  }

  return (
    <div className="todos-bg-container">
      <div className="heading-container text-center">
        <h1 className="todos-heading">Todos</h1>
      </div>
      <div className="content-container">
        <div className="inputs-container">
          <h1 className="create-task-heading">
            Create <span className="create-task-heading-subpart">Task</span>
          </h1>
          <input
            type="text"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            className="todo-user-input"
            placeholder="What needs to be done?"
          />
          <textarea
            rows="5"
            cols="50"
            value={userDescriptionInput}
            onChange={e => setUserDescriptionInput(e.target.value)}
            className="todo-user-description-input"
            placeholder="Write your description here..."
          />
          <div>
            <button type="button" className="button" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>
        <div className="inputs-container">
          <h1 className="todo-items-heading">
            My <span className="todo-items-heading-subpart">Tasks</span>
          </h1>
          <ul className="todo-items-container">
            {todoList.map(todo => (
              <li
                key={`todo${todo.uniqueNo}`}
                className={`todo-item-container d-flex flex-column ${
                  todo.isChecked ? 'checked' : ''
                }`}
              >
                <div className="label-container d-flex flex-row">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={todo.isChecked}
                    onChange={() => handleTodoStatusChange(todo.uniqueNo)}
                  />
                  <label
                    htmlFor={`checkbox${todo.uniqueNo}`}
                    className="checkbox-label"
                  >
                    {todo.text}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.uniqueNo)}
                  >
                    <MdDelete className="delete-icon" />
                  </button>
                </div>
                <p className="todo-description">{todo.textDescription}</p>
              </li>
            ))}
          </ul>
          <button type="button" className="button" onClick={() => {}}>
            Save
          </button>
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  )
}

export default Todos
