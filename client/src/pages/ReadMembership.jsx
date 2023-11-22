import React, { useState, useEffect } from 'react'; 
import {toast} from "react-toastify"; 
import axios from "axios"; 
import { Link } from 'react-router-dom'; 


const ReadMembership = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-studentclubs");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []); 

    const write = (e) => {
        if(e == 'P'){
            return "President/Club Head"; 
        } 
        if(e == "D"){
            return "Domain Head"; 
        }
        if(e == 'M'){
            return "Member"; 
        }
    }

    const deleteContact = (id, id2) => {
        if(window.confirm("Are you sure that you wanted to delete that entry ?")){ 
            console.log("id srn",id, id2);
            axios.delete(`http://localhost:5000/api/remove-membership/${id}/${id2}`)
            toast.success("Role deleted successfully") 
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div> 
            <h1 className="text-center text-purple-400 font-mono font-bold text-5xl">ROLES</h1> 

            <div className='mt-[20px]'>

            <table>
                <thead>
                    <tr>
                        <th className="text-white text-lg px-6 py-3">SRN</th>
                        <th className="text-white text-lg px-6 py-3">Name</th>
                        <th className="text-white text-lg px-6 py-3">Club ID</th>
                        <th className="text-white text-lg px-1 py-3">Club Name</th>
                        <th className="text-white text-lg px-1 py-3">Role</th>
                        <th className="text-white text-lg px-1 py-3">Domain</th>
                        <th className="text-white text-lg px-6 py-3">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}>
                        <td className="text-bold text-lg px-6 py-3">{item.srn}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.name}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.clubId}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.clubName}</td>
                        <td className="text-bold text-lg px-6 py-3">{write(item.role)}</td>
                        <td className="text-bold text-lg px-6 py-3">{item.domain}</td>
                        <td>
                            <Link to={`/update-membership/${item.clubId}`}>
                            <button className="font-inter font-bold bg-amber-300 text-black px-4 py-2 rounded-md">Edit</button>
                            &nbsp; 
                            </Link> 
                            <button className="font-inter font-bold bg-red-500 text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.clubId, item.srn)}>Del</button> 
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    )
}

export default ReadMembership




