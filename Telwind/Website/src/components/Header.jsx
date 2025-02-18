import React, { useState } from 'react'
import {IoMdMenu ,  IoIosClose} from 'react-icons/io'

const Header = () => {
    const [ toggel , setToggle] = useState(false)
  return (
    <div className='bg-blue-700 p-4'>
        <div className='max-w-[1240px] py-3 items-center   mx-auto flex justify-between'>
            <div className='text-2xl font-bold m-2'>
                WsCubeTech
            </div>
            {
                toggel ? <IoIosClose onClick={() => setToggle(!toggel)} className='text-white text-2xl md:hidden block'/>
                :
                <IoMdMenu onClick={() => setToggle(!toggel)} className='text-white text-2xl md:hidden block'/> 
                
            }
            
            
            <ul className=' hidden md:flex gap-10 m-2 text-white'>
                <li>Home</li>
                <li>Company</li>
                <li>Resources</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            {/* response Menu */}
            <ul className= {`duration-300 md:hidden bg-black fixed justify-center ${toggel ? "top-[104px]" :"top-[-100%]"} left-0 w-screen text-white  text-center `}>
                <li>Home</li>
                <li>Company</li>
                <li>Resources</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    </div>
  )
}

export default Header