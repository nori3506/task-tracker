import React from 'react'
import Tasks from './Tasks'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(() => {
    const getCompletedTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setCompletedTasks(tasksFromServer)
    }
    getCompletedTasks()
  }, [])

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${ id }`)
    const data = await res.json()
    return data
  }

  const fetchTasks = async () => {
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

  return (
    <div>
      <h1>Completed Tasks</h1>
      {completedTasks.length > 0 ? <Tasks tasks={completedTasks} /> : "No Task to Show"}
      <Link to = "/" > Go Back </Link>
    </div>
  )
}

export default Completed
