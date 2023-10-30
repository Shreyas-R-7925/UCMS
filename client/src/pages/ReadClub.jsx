import React, { useState, useEffect } from 'react'; 
import {toast} from "react-toastify"; 
import axios from "axios"; 
import { Link } from 'react-router-dom'; 
import { instagram, mail } from '../assets';


const ReadClub = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-club");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []);

    const deleteContact = (id) => {
        if(window.confirm("Are you sure that you wanted to delete that entry ?")){ 
            console.log(id);
            axios.delete(`http://localhost:5000/api/remove-club/${id}`)
            toast.success("contact deleted successfully") 
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div> 
            <h1 className="text-center font-mono text-2xl">CLUBS</h1> 

            <div className='mt-[20px]'>

            <table>
                <thead>
                    <tr>
                        <th className="px-6 py-3">Club Name</th>
                        <th className="px-6 py-3">Club ID</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Social Media</th>
                        <th className="px-6 py-3">Email</th> 
                        <th className="px-6 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id}>
                        <td className="px-6 py-3">{item.clubName}</td>
                        <td className="px-6 py-3">{item.clubId}</td>
                        <td className="px-6 py-3">{item.description}</td>
                        <td className="px-6 py-3"> 
                            <a href={item.socMed} className="hover:opacity-75 transition-opacity">
                                <img src={instagram} className='w-10 h-10' alt="" />
                            </a>
                        </td>
                        <td className="px-6 py-3"> 
                            <a href={item.email} className="hover:opacity-75 transition-opacity">
                                <img src={mail} className='w-10 h-10' alt="" />
                            </a>
                        </td>
                        <td>
                            <Link to={`/update-club/${item.clubId}`}>
                            <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            </Link> 
                            <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.clubId)}>Del</button> 
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}

export default ReadClub




