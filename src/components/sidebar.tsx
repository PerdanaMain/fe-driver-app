import React from 'react'

const Sidebar = () => {
  return (
    <div className="row-span-3 bg-white rounded-xl shadow py-3 px-5">
      <ul className="list-none">
        <li className='mb-2'>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className='mb-2'>
          <a href="/senders">Senders</a>
        </li>
        <li className='mb-2'>
          <a href="/packages">Packages</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar