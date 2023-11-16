import React from 'react' 
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
// import {logo} from './assets'; 
import {Home, Create, Read, AddClub, AddStudent, AddFaculty, AddMembership, ReadClub, ReadFaculty, ReadStudent, ReadMembership,
UpdateClub, UpdateFaculty, UpdateMembership, UpdateStudent} from './pages'; 
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import Query from './pages/Query';
import { university } from './assets'

const App = () => {
  return ( 

    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4'>
        <Link to="/">
          <div className='header-logo'>
            {/* <img src={logo} alt="logo" className='w-16 object-contain' /> */}
            <p class="flex items-center text-white">
              <img src={university} class="rounded-lg" alt="" width="50px" />
              <span class="font-sans text-3xl ml-2">UCMS</span>
            </p>
  
          </div>
        </Link>
        <span>
          <Link to="/create" className="font-mono font-bold text-lg bg-green-300 text-black px-4 py-2 rounded-md">Create</Link>
          &nbsp;
          &nbsp;
          <Link to="/read" className="font-mono font-bold text-lg bg-green-300 text-black px-4 py-2 rounded-md">Read</Link> 
          &nbsp;
          &nbsp;
          <Link to="/query" className="font-mono font-bold text-lg bg-green-300 text-black px-4 py-2 rounded-md">Query</Link>
         </span>
        
      </header>
      <ToastContainer position="bottom-right" />

      <main className="sm:p-8 px-4 py-8 w-full bg-black min-h-[calc(100vh-73px)]">
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