import React from 'react'
import { Link } from 'react-router-dom'

function footer() {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      < div className = "flexColumn" >
        <Link to="/about">About</Link>
        <Link to="/completed">Completed Tasks</Link>
      </div>
    </footer>
  )
}

export default footer
