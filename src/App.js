import {useState} from 'react'

import Header from './components/Header'
import Tasks from './components/Tasks'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "aaa",
      day: "asdfdsa",
      reminder: false,
    },
    {
      id: 2,
      text: "bbb",
      day: "asdfdsa",
      reminder: true,
    },
    {
      id: 3,
      text: "ccc",
      day: "asdfdsa",
      reminder: false,
    },
  ])

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => 
      task.id !==id
    ))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={ toggleReminder }/> : "No Task to Show"}
    </div>
  );
}

export default App;
