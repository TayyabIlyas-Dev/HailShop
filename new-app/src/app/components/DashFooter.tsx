import Link from 'next/link'
import React from 'react'

const DashFooter = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
      <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p className="text-[15px] leading-loose">© HailShop. All rights reserved.</p>

        <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          <li><Link href="javascript:void(0)" className="text-[15px] hover:text-white">Terms of Service</Link></li>
          <li><Link href="javascript:void(0)" className="text-[15px] hover:text-white">Privacy Policy</Link></li>
          <li><Link href="javascript:void(0)" className="text-[15px] hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </footer>
    </div>
  )
}

export default DashFooter
