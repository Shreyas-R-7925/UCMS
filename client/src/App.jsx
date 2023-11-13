import React from 'react' 
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
// import {logo} from './assets'; 
import {Home, Create, Read, AddClub, AddStudent, AddFaculty, AddMembership, ReadClub, ReadFaculty, ReadStudent, ReadMembership,
UpdateClub, UpdateFaculty, UpdateMembership, UpdateStudent} from './pages'; 
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import Query from './pages/Query';

const App = () => {
  return ( 

    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4'>
        <Link to="/">
          <div className='header-logo'>
            {/* <img src={logo} alt="logo" className='w-16 object-contain' /> */}
            <p class="text-[24px] text-blue-900">UC<span class="text-[24px] text-orange-500">MS</span></p>
          </div>
        </Link>
        <span>
          <Link to="/create" className="font-mono text-lg bg-lime-300 text-black px-4 py-2 rounded-md">Create</Link>
          &nbsp;
          <Link to="/read" className="font-mono text-lg bg-lime-300 text-black px-4 py-2 rounded-md">Read</Link> 
          &nbsp;
          <Link to="/query" className="font-mono text-lg bg-lime-300 text-black px-4 py-2 rounded-md">Query</Link>
         </span>
        
      </header>
      <ToastContainer position="bottom-right" />

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} /> 
          <Route path="/read" element={<Read />} /> 
          <Route path="/newClub" element={<AddClub/>} />
          <Route path="/newStudent" element={<AddStudent/>} />
          <Route path="/newFaculty" element={<AddFaculty/>} />
          <Route path="/newMembership" element={<AddMembership/>} />
          <Route path="/viewClub" element={<ReadClub/>} />
          <Route path="/viewFaculty" element={<ReadFaculty/>} />
          <Route path="/viewStudent" element={<ReadStudent/>} />
          <Route path="/viewMembership" element={<ReadMembership/>} />
          <Route path="/update-club/:id" element={<UpdateClub />} />
          <Route path="/update-student/:id" element={<UpdateStudent />} />
          <Route path="/update-faculty/:id" element={<UpdateFaculty />} />
          <Route path="/update-membership/:id" element={<UpdateMembership />} />
          <Route path="/query" element={<Query />} />
        </Routes>
      </main> 
      
    </BrowserRouter>
    
  )
}

export default App