import React from 'react'
import CheckOut from '../components/CheckOut'
import { Footer, Navbar } from '../components'

const page = () => {
  return (
    <div className='bg-gray-100 '>
        <Navbar/>
        <div className='pt-20  pb-4'>
            <CheckOut/>
        </div>
        <Footer/>
    </div>
  )
}

export default page