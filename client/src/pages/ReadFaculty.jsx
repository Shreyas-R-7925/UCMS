import React, { useState, useEffect } from 'react'; 
import {toast} from "react-toastify"; 
import axios from "axios"; 
import { Link } from 'react-router-dom'; 

const ReadFaculty = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-faculty");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("Are you sure that you wanted to delete that entry ?")){ 
            console.log(id);
            axios.delete(`http://localhost:5000/api/remove-faculty/${id}`)
            toast.success("contact deleted successfully") 
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center'> 
            <h1 className="text-center text-purple-400 font-mono font-bold text-5xl">FACULTY ADVISORS</h1> 

            <div className='mt-[20px]'>

            <table>
                <thead>
                    <tr>
                        <th className="text-white text-lg px-6 py-3">Faculty Name</th>
                        <th className="text-white text-lg px-6 py-3">Club ID</th>
                        <th className="text-white text-lg px-6 py-3">Club Name</th>
                        <th className="text-white text-lg px-6 py-3">Email</th>
                        <th className="text-white text-lg px-6 py-3">Phone No.</th>
                        <th className="text-white text-lg px-6 py-3">Dept.</th>
                        <th className="text-white text-lg px-6 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}>
                        <td className="text-bold text-lg px-6 py-3">{item.faculty_name}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.clubId}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.clubName}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.email}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.phone_no}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.department}</td>
                        <td>
                            <Link to={`/update-faculty/${item.faculty_id}`}>
                            <button className="font-inter font-bold bg-amber-300 text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            </Link> 
                            <button className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.faculty_id)}>Del</button> 
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}

export default ReadFaculty




