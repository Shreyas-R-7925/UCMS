import React from 'react'; 
import { Link } from 'react-router-dom';

const Create = () => { 

    return (
        <div className="mt-[6%] flex flex-col items-center justify-center">
                <div>
                <Link to="/newClub" className="font-mono text-2xl font-bold bg-sky-200 text-black mr-14 px-4 py-2 rounded-md">ADD CLUB</Link>
                </div> 
                <br /> 
                <br />
                <div>
                <Link to="/newStudent" className="font-mono text-2xl font-bold bg-sky-400 text-black mr-4 px-4 py-2 rounded-md">ADD STUDENT</Link>
                </div> 
                <br /> 
                <br />
                
                
                <div>
                <Link to="/newFaculty" className="font-mono text-2xl font-bold bg-sky-200 text-black mr-4 px-4 py-2 rounded-md">ADD FACULTY</Link>
                </div>  

                <br />  
                <br />

                <div>
                <Link to="/newMembership" className="font-mono text-2xl font-bold bg-sky-400 text-black mr-10 px-4 py-2 rounded-md">ADD ROLES</Link>
                </div>
                
        </div>
    )
}

export default Create