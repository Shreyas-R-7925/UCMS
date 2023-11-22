import React from 'react' 
import { university } from '../assets'

const Home = () => {
  return (
    <section className='max-w-7xl mx-auto'> 
      <div className="grid grid-cols-2 gap-4 px-12 mt-[3%]">
          <div> 
            <p className='font-mono mt-2 text-[#666e75] text-[18px] max-w-[500px] text-white'>
              <span className='font-mono text-[50px] text-green-400'>University Club Management System<br/></span>
              At the heart of our platform lies a commitment to elevate university club management, fostering efficiency, collaboration, and an enriched sense of community. 
              Navigate effortlessly through our intuitively crafted, user-friendly interface, empowering you to explore a diverse array of clubs. 
              Discover the richness of our platform as you engage with a comprehensive list of clubs, each contributing to the vibrant tapestry of campus life. 
              Whether you're a student seeking new interests, a club member looking to connect, or an administrator ensuring smooth operations, our system caters to your needs.            
            </p>
            <span className='font-mono text-[25px] text-green-400'> Where Connectivity and Community Converge <br/></span>
          </div> 
          <div className='px-12 flex justify-center items-center'>
            <img src={university} className="rounded-lg" alt="" width= "550px" />
          </div>
      </div>  
      <div className='fixed bottom-0 w-full right-0'>
        
      </div>
    </section>
  )
}

export default Home