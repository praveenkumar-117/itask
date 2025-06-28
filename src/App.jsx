import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import edt from '../src/edt.png';
import dlt from '../src/dlt.png';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [showCompleted, setShowCompleted] = useState(false);


  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString !== null) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])

  const saveToDo = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    if (editIndex === null) {
      setTodos([...todos, { todo, isCompleted: false }])

    }
    else {
      let editTodos = todos.map((item, i) => i === editIndex ? { ...item, todo } : item)
      setTodos(editTodos);
      setEditIndex(null);
    }
    setTodo("")
    saveToDo();
  }

  const handleEdit = (index) => {
    let editTodo = todos[index]
    setTodo(editTodo.todo);
    setEditIndex(index)
    saveToDo();
  }

  const handleDelete = (index) => {
    let finaltodos = todos.filter((v, i) => i !== index)
    setTodos(finaltodos)
    saveToDo();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = ((index) => {
    setTodos(todos.map((item, i) => i === index ? { ...item, isCompleted: !item.isCompleted } : item))
    saveToDo();
  })

  const toggleShowCompleted = () => {
    setShowCompleted(prevState => !prevState);
  };
  const filteredTodos = showCompleted ? todos.filter(item => item.isCompleted) : todos;




  return (
    <>

      <Navbar />
      <div className="md:container todobody md:w-1/2 mx-auto my-5 rounded-xl p-5  ">
        <h1 className='text-white text-3xl font-bold text-center my-4'>  itask- Manage Your Tasks</h1>

        <div className="btn-container rounded-md">
          <button id="schedule-button" className={` tab-button w-1/2 rounded  text-white font-bold mx-4 my-2 px-4 py-1 ${!showCompleted ? 'active' : ''} `} onClick={() => setShowCompleted(false)}>Add Your Task</button>
          <button id="note-button" className={`tab-button w-1/2 rounded text-white font-bold mx-4 my-2 px-4 py-1 ${showCompleted ? 'active' : ''}`} onClick={toggleShowCompleted}>Show Completed</button>
        </div>



        <input onChange={handleChange} value={todo} className=' w-full rounded-md  my-3 py-1' />
        <button className=' btn-save w-full font-medium text-black rounded-md my-1 py-1' disabled={todo.length <= 3} onClick={handleAdd}>SAVE</button>

        {/* <div className='text-white my-2 px-2'><input type="checkbox" name='Show Finished' /> Show Finished </div> */}

        <h1 className='text-white font-bold  my-4'>Your ToDo's</h1>
        <div className='todos'>
          {filteredTodos.length === 0 && <div className='m-5 text-white font-bold'> Add New task </div>}
          {filteredTodos.map((item, i) => {
            return (
              <div key={i} className='todo text-white font-bold flex items-center justify-between p-2 my-3 rounded-md'>

                <div className={item.isCompleted ? 'line-through flex items-center' : 'flex items-center'} >
                  <input type="checkbox" className='mx-2 peer relative appearance-none w-5 h-5 border rounded-full border-blue-800 checked:bg-red-600 chkbx' onChange={() => handleCheckbox(i)} checked={item.isCompleted} />{i + 1}- {item.todo}</div>
                <div className='buttons flex h-full'>

                  <button className='w-8 h-8 p-2 py-1 text-xl rounded-full mx-1 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg ' style={{ backgroundImage: `url(${edt})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleEdit(i)}></button>
                  <button className='w-8 h-8 p-2 py-1 text-xl  rounded-full mx-1 transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg' style={{ backgroundImage: `url(${dlt})`, backgroundSize: 'cover', backgroundPosition: 'center' }} onClick={() => handleDelete(i)}></button>
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default App
