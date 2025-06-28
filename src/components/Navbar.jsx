import React from 'react'

export default function Navbar() {
  return (
    <nav className='nav-bar flex justify-between  text-white py-2'>
      <div className="logo">
        <span className='font-bold taxt-xl mx-8'>iTask</span>
      </div>
      <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Task</li>
      </ul>
    </nav>
  )
}
