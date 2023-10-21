import React, { useState, useEffect } from 'react'; 
import {toast} from "react-toastify"; 

import axios from "axios"; 
import { Link } from 'react-router-dom';

const Create = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []); 

    const deleteContact = (id) => {
        if(window.confirm("Are you sure that you wanted to delete that entry ?")){ 
            console.log(id);
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("contact deleted successfully") 
            setTimeout(() => loadData(), 500);
        }
    }
    return (
        <div>
            <button className="font-inter font-medium bg-[#bfbbf0] text-black px-4 py-2 rounded-md">Add Club</button> 
            &nbsp;
            <button className="font-inter font-medium bg-[#bfbbf0] text-black px-4 py-2 rounded-md">Add Student</button>
            &nbsp;
            <button className="font-inter font-medium bg-[#bfbbf0] text-black px-4 py-2 rounded-md">Add Faculty</button>
            &nbsp;
            <button className="font-inter font-medium bg-[#bfbbf0] text-black px-4 py-2 rounded-md">Add Membership</button> 
            {/* {console.log(data)} */}
            {data.map((item, index) => {
                return(
                    <tr key={item.id}>
                        <th scope='row'>{index+1}</th>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md">Edit</button>
                            </Link> 
                            <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md" onClick={ () => deleteContact(item.id)}>Delete</button> 
                            <Link to = {`/view/${item.id}`}>
                                <button className="font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md">View</button>
                            </Link>
                        </td>
                    </tr>
                )
            })}
        </div>
    )
}

export default Create