import React, { useState, useEffect } from 'react'
import { FormField } from '../components' 
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    srn:"", 
    club_Id:"", 
    role:"", 
    domain:""
};

const AddMembership = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-club");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []); 

  const [state, setState] = useState(initialState);

  const { srn, club_Id, role, domain } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }; 

  const handleSend = async (e) => {

    e.preventDefault();
    // console.log(userName);

    if (!role || !srn || !club_Id) {
      toast.error('Please fill in all fields');
      return;
    }

    if (state.role === "P") {
        state.domain = null;
    }

    axios.post("http://localhost:5000/api/add-membership",{
            srn, 
            club_Id, 
            role, 
            domain,
        })
        .then(()=>{
            toast.success("Role added successfully");
            setState({srn:"", club_Id:"", role:"", domain:"" });
        })
        .catch((err) => toast.error(err.response.data));
  }

  return (
    <div>  
        <div className='flex justify-center mt-[0.25%] mb-[2%]'>
            <h1 className='font-mono font-bold text-purple-400 text-5xl'> ADD ROLES</h1>
        </div>
        
        <br />

        <div className="flex justify-center">

            <table>
                <thead>
                    <tr>
                        <th className="text-white text-xl px-6 py-3">Sr. No</th>
                        <th className="text-white text-xl px-6 py-3">Club Name</th>
                        <th className="text-white text-xl px-6 py-3">Club ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}>
                        <td className="text-lg font-bold px-6 py-3">{index + 1}</td>
                        <td className="text-lg font-bold px-6 py-3">{item.clubName}</td>
                        <td className="text-lg font-bold px-6 py-3">{item.clubId}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>
        
        <form className='mr-[20%] ml-[20%] mt-[2%] mb-[3%]' onSubmit={handleSend}>
            <FormField
                labelName="SRN"
                type="text" 
                id="srn"
                name="srn"
                placeholder="PES2UG21CS000"
                value={state.srn}
                onChange={handleInputChange}
            />

            <FormField
                labelName="Club Id"
                type="text" 
                id="club_Id"
                name="club_Id"
                placeholder="Enter the respective club id"
                value={state.club_Id}
                onChange={handleInputChange}
            />

        <div className="mb-4">
            <label htmlFor="role" className="block text-base text-gray-900">
                Role
            </label>
            <select
                id="role"
                name="role"
                value={state.role}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            > 
                <option value="M">Member</option>
                <option value="D">Domain Head</option>  
                <option value="P">President/ Club Head</option>

            </select>
            </div>
            
            {state.role !== "P" && 
            <FormField
                labelName="Domain"
                type="text" 
                id="domain"
                name="domain"
                placeholder="Enter your domain"
                value={state.domain}
                onChange={handleInputChange}
            />}
            
            

            <div className='float-right'>
              <input type="submit" value="Save" className='bg-purple-300 font-bold px-4 py-2 rounded-md'/>
            </div>
        </form>
    </div>
  )
}

export default AddMembership