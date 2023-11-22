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
            toast.success("Club deleted successfully") 
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center"> 
            <h1 className="text-center text-purple-400 font-bold font-mono text-5xl mb-[2%]">CLUBS</h1> 

            <div className='mt-[20px]'>

            <table>
                <thead>
                    <tr>
                        <th className="text-white text-lg px-6 py-3">Club Name</th>
                        <th className="text-white text-lg px-6 py-3">Club ID</th>
                        <th className="text-white text-lg px-6 py-3">Description</th>
                        <th className="text-white text-lg px-6 py-3">Soc. Media</th>
                        <th className="text-white text-lg px-6 py-3">Email</th> 
                        <th className="text-white text-lg px-6 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}>
                        <td className="text-bold text-lg px-6 py-3">{item.clubName}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.clubId}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.description}</td>
                        <td className="text-bold text-lg px-6 py-3"> 
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
                            <button className="font-inter font-bold bg-amber-300 text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            </Link> 
                            <button className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.clubId)}>Del</button> 
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




