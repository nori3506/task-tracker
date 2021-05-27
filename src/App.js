import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Completed from './components/Completed'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchActiveTasks()
      setTasks(tasksFromServer)
    }
    const getCompletedTasks = async () => {
      const completedTasksFromServer = await fetchCompletedTasks()
      setCompletedTasks(completedTasksFromServer)
    }
    getTasks()
    getCompletedTasks()
  }, [])

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${ id }`)
    const data = await res.json()
    return data
  }

  const fetchActiveTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    const activeTasks = []
    data.map((fetchedTask) => {
      if (fetchedTask.status === "active") {
        activeTasks.push(fetchedTask)
      }
    })
    return activeTasks
  }

  const fetchCompletedTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const fetchedTasks = await res.json()
    const completedTasks = []
    fetchedTasks.map((fetchedTask) => {
      if (fetchedTask.status === "completed") {
        completedTasks.push(fetchedTask)
      }
    })
    return completedTasks
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${ id }`, {
      method: 'DELETE',
    })
    setCompletedTasks(completedTasks.filter((task) =>
      task.id !==id
    ))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${ id }`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    setCompletedTasks(completedTasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  const activeTask = async (id) => {
    const targetTask = await fetchTask(id)
    const updateTask = await { ...targetTask, status: "active" }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()
    const newReview = completedTasks.map((task) => task.id === id ? { ...task, status: data.status } : task)

    setCompletedTasks(newReview)
    // setTasks(tasks.map((task) => task.id === id ? { ...task, status: "active" } : task))
    // setTasks(tasks)
  }

  const completeTask = async (id) => {
    const targetTask = await fetchTask(id)
    const updateTask = await {
      ...targetTask,
      status: "completed"
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })
    const data = await res.json()
    completedTasks.map((completedTask) => {
      if (completedTask.id === id) {
        completedTask.status = data.status
      }
    })
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={ showAddTask } />
        <Route path='/' exact render={(props)=>(
          <>
            {showAddTask && <AddTask onAdd={ addTask } />}
            {tasks.length > 0 ? <Tasks tasks={ tasks } onDelete={ deleteTask } onToggle={ toggleReminder } onActive={ activeTask } onCheck={ completeTask } /> : "No Task to Show"}
          </>
        )}
        />
        <Route path='/about' component={ About } />
        <Route path='/completed' render={(props)=>(
          <>
            {tasks.length > 0 ? <Completed completedTasks={completedTasks} onDelete={deleteTask} onToggle={toggleReminder} onActive={activeTask} onCheck={ completeTask }/> : "No Task to Show"}
          </>
        )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
