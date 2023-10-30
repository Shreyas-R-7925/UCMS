import React from 'react' 
import { university } from '../assets'

const Home = () => {
  return (
    <section className='max-w-7xl mx-auto'> 
      <div className="grid grid-cols-2 gap-4 px-12 mt-[3%]">
          <div> 
            <p className='mt-2 text-[#666e75] text-[18px] max-w-[500px]'>
              <span className='text-[48px] text-orange-400'>University Club Management System,<br /></span>
              aims to streamline and enhance club-related activities by offering essential features like club registration, event management, member communication, 
              and easy access to student and faculty information. With a user-friendly interface, it simplifies registration processes, aids in event planning, 
              and fosters communication among club members, leaders, and administrators. Such a system can greatly enhance the organization and management of university clubs, 
              fostering a more vibrant and engaged campus community.
            </p>
          </div> 
          <div className='px-12 flex justify-center items-center'>
            <img src={university} className="rounded-lg" alt="" width= "450px" />
          </div>
      </div>  
      <div className='fixed bottom-0 w-full right-0'>
        
      </div>
    </section>
  )
}

export default Home