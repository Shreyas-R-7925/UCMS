import React from 'react'; 
import { Link } from 'react-router-dom';

const Read = () => { 

    return (
        <div className="mt-[6%] flex flex-col items-center justify-center">

            <div>
            <Link to="/viewClub" className="font-mono text-2xl font-bold bg-sky-400 text-black mr-10 px-4 py-2 rounded-md">VIEW CLUB</Link>
            </div> 

            <br />
            <br />

            <div>
            <Link to="/viewStudent" className="font-mono text-2xl font-bold bg-sky-200 text-black mr-10 px-4 py-2 rounded-md">VIEW STUDENT</Link>
            </div> 

            <br />
            <br />

            <div>
            <Link to="/viewFaculty" className="font-mono text-2xl font-bold bg-sky-400 text-black mr-10 px-4 py-2 rounded-md">VIEW FACULTY</Link>
            </div> 

            <br />
            <br /> 

            <div>
            <Link to="/viewMembership" className="font-mono text-2xl font-bold bg-sky-200 text-black mr-10 px-4 py-2 rounded-md">VIEW ROLES</Link>
            </div>
            
            
            
            
        </div>
    )
}

export default Read