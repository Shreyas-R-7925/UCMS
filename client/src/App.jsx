import React from 'react' 
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
// import {logo} from './assets'; 
import {Home, Create, Read, Update, Delete} from './pages'; 
import {ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

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
          <Link to="/create" className="font-inter font-medium text-black px-4 py-2 rounded-md">Create</Link>
          <Link to="/read" className="font-inter font-medium text-black px-4 py-2 rounded-md">Read</Link>
          <Link to="/update" className="font-inter font-medium text-black px-4 py-2 rounded-md">Update</Link>
          <Link to="/delete" className="font-inter font-medium text-black px-4 py-2 rounded-md">Delete</Link>
        </span>
        
      </header>
      <ToastContainer position="bottom-right" />

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} /> 
          <Route path="/read" element={<Read />} /> 
          <Route path="/update/:id" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </main> 
      
    </BrowserRouter>
    
  )
}

export default App