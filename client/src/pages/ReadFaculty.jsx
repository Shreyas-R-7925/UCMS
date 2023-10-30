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
        <div> 
            <h1 className="text-center font-mono text-2xl">FACULTY</h1> 

            <div className='mt-[20px]'>

            <table>
                <thead>
                    <tr>
                        <th className="px-6 py-3">Faculty Name</th>
                        <th className="px-6 py-3">Club ID</th>
                        <th className="px-6 py-3">Club Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Phone No.</th>
                        <th className="px-6 py-3">Department</th>
                        <th className="px-6 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id}>
                        <td className="px-6 py-3">{item.faculty_name}</td>
                        <td className="px-6 py-3">{item.clubId}</td>
                        <td className="px-6 py-3">{item.clubName}</td>
                        <td className="px-6 py-3">{item.email}</td>
                        <td className="px-6 py-3">{item.phone_no}</td>
                        <td className="px-6 py-3">{item.department}</td>
                        <td>
                            <Link to={`/update-faculty/${item.faculty_id}`}>
                            <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            </Link> 
                            <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.faculty_id)}>Del</button> 
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




