import React from 'react'
import Tasks from './Tasks'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Completed = ({ onDelete, completedTasks, onActive, onToggle, onCheck }) => {
  return (
    <div>
      <h1>Completed Tasks</h1>
      { completedTasks.length > 0 ? <Tasks tasks={ completedTasks } onDelete={ onDelete } onActive={ onActive } onToggle={ onToggle } onCheck={ onCheck } /> : "No Task to Show" }
    </div>
  )
}

export default Completed
