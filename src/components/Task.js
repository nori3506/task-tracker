import { FaTimes, FaRedo } from 'react-icons/fa'
import { AiOutlineCheck } from "react-icons/ai";


const Task = ({ task, onDelete, onToggle, onActive, onCheck }) => {
  return (
    < div className={ `task ${ task.reminder ? 'reminder' : '' } `}
    onDoubleClick = {() => onToggle(task.id) }>
      <h3>
        {task.text}{' '}
        <div className="icons">
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(task.id)}
            className = "space"
          />
          <AiOutlineCheck style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => onCheck(task.id) }
          />
          <FaRedo style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => onActive(task.id)}
            className = "space"
           />
        </div>
        
      </h3>
      <p>{ task.day }</p>
    </div>
  )
}

export default Task
