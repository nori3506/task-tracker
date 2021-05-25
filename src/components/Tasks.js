import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle, onActive, onCheck }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={ index } task={ task } onDelete={ onDelete } onToggle={ onToggle } onActive={ onActive } onCheck={ onCheck }/>
      ))}
    </>
  )
}

export default Tasks
