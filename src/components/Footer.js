import React from 'react'
import { Link } from 'react-router-dom'

function footer() {
  return (
    <footer>
      < div className = "flexColumn" >
        <Link to = "/" > Active Tasks </Link>
        <Link to="/completed">Completed Tasks</Link>
        <Link to="/about" > About </Link>
        <p>Copyright &copy; 2021</p>
      </div>
    </footer>
  )
}

export default footer
