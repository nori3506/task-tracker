import { FaTimes, FaRedo } from 'react-icons/fa'
import { AiOutlineCheck } from "react-icons/ai";
import { useLocation } from 'react-router-dom'

const Task = ({ task, onDelete, onToggle, onActive, onCheck }) => {
  const location = useLocation()
  return (
    < div className={ `task ${ task.reminder ? 'reminder' : '' } `}
    onDoubleClick = {() => onToggle(task.id) }>
      <h3>
        {task.text}{' '}
        <div className="icons">
          {
            location.pathname === '/completed' &&
            <FaTimes
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => onDelete(task.id)}
              className = "space"
            />
          }
    
          {
            location.pathname === '/' &&
            <AiOutlineCheck
              style={{ color: 'green', cursor: 'pointer' }}
              onClick={() => onCheck(task.id) }
            />
          }

          {
            location.pathname === '/completed' &&
            <FaRedo
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => onActive(task.id)}
              className = "space"
            />
          }
        </div>
      </h3>
      <p>{ task.day }</p>
    </div>
  )
}

export default Task
