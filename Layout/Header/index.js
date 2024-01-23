import React from 'react'
import Sidebar from './Sidebar'

export default function Header({ title }) {
  return (
    <div className='header df aic py px-2' >
      <Sidebar />
      <h3>{title}</h3>
    </div>
  )
}
