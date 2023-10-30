import React from 'react'; 
import { Link } from 'react-router-dom';

const Read = () => { 

    return (
        <div>
            <div className='flex justify-center'>
                <Link to="/viewClub" className="font-inter font-medium bg-orange-200 text-black mr-4 px-4 py-2 rounded-md">VIEW CLUB</Link>
                <Link to="/viewStudent" className="font-inter font-medium bg-orange-400 text-black mr-4 px-4 py-2 rounded-md">VIEW STUDENT</Link>
                <Link to="/viewFaculty" className="font-inter font-medium bg-blue-400 text-black mr-4 px-4 py-2 rounded-md">VIEW FACULTY</Link>
                <Link to="/viewMembership" className="font-inter font-medium bg-blue-200 text-black mr-4 px-4 py-2 rounded-md">VIEW MEMBERSHIP</Link>
            </div>
        </div>
    )
}

export default Read