import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
       <div className="text-center backdrop-blur-xl mt-40 mb-40">
                    <h1 className="text-3xl font-bold mb-6 text-center">Thanks For Shopping </h1>

      
          <Link href="/">
            <p className="mt-6 inline-block border-2 border-black text-black px-6 py-3  font-semibold hover:bg-black hover:text-white transition">
              Return Home
            </p>
          </Link>
        </div>
    </div>
  )
}

export default page
