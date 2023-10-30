import React from 'react'; 
import { Link } from 'react-router-dom';

const Create = () => { 

    return (
        <div>
            <div className='flex justify-center'>
                <Link to="/newClub" className="font-inter font-medium bg-orange-200 text-black mr-4 px-4 py-2 rounded-md">ADD CLUB</Link>
                <Link to="/newStudent" className="font-inter font-medium bg-orange-400 text-black mr-4 px-4 py-2 rounded-md">ADD STUDENT</Link>
                <Link to="/newFaculty" className="font-inter font-medium bg-blue-400 text-black mr-4 px-4 py-2 rounded-md">ADD FACULTY</Link>
                <Link to="/newMembership" className="font-inter font-medium bg-blue-200 text-black mr-4 px-4 py-2 rounded-md">ADD MEMBERSHIP</Link>
            </div>
        </div>
    )
}

export default Create