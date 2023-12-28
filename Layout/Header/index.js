import React from 'react'
import Sidebar from './Sidebar'

export default function Header({ title }) {
  return (
    <div className='header df aic' >
      <Sidebar />
      <h3>{title}</h3>
    </div>
  )
}
