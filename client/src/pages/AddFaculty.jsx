import React, { useState, useEffect } from 'react'
import { FormField } from '../components' 
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    faculty_name:"", 
    email:"", 
    phone_no:"", 
    department:"", 
    clubId:""
};

const AddFaculty = () => {
    const [data, setData] = useState([]); 
 
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get-club");
        setData(response.data); 
    } 

    useEffect(() => {
        loadData(); 
    }, []); 

  const [state, setState] = useState(initialState);

  const { faculty_name, email, phone_no, department, club_Id } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }; 

  const handleSend = async (e) => {

    e.preventDefault();
    // console.log(userName);

    if (!faculty_name || !email || !phone_no || !department || !club_Id) {
      toast.error('Please fill in all fields');
      return;
    }

    axios.post("http://localhost:5000/api/add-faculty",{
            faculty_name, 
            email, 
            phone_no, 
            department, 
            club_Id,
        })
        .then(()=>{
            toast.success("Faculty added successfully");
            setState({faculty_name:"", email:"", phone_no:"", department:"", club_Id:"" });
        })
        .catch((err) => toast.error(err.response.data));
  }

  return (
    <div>  
        <div className='flex justify-center mt-[0.25%] mb-[2%]'>
            <h1 className='font-mono font-bold text-purple-400 text-5xl'> ADD FACULTY ADVISOR</h1>
        </div>
        
        <br />

        <div className="flex justify-center">

            <table>
                <thead>
                    <tr>
                        <th className="text-xl text-white px-6 py-3">Sr. No</th>
                        <th className="text-xl text-white px-6 py-3">Club Name</th>
                        <th className="text-xl text-white px-6 py-3">Club ID</th>
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
                labelName="Faculty Name"
                type="text" 
                id="faculty_name"
                name="faculty_name"
                placeholder="Enter faculty name"
                value={state.faculty_name}
                onChange={handleInputChange}
            />

            <FormField
                labelName="E-mail"
                type="email" 
                id="email"
                name="email"
                placeholder="abc@gmail.com"
                value={state.email}
                onChange={handleInputChange}
            /> 

            <FormField
                labelName="Phone No."
                type="text" 
                id="phone_no"
                name="phone_no"
                placeholder="+91- "
                value={state.phone_no}
                onChange={handleInputChange}
            />

<div className="mb-4">
            <label htmlFor="department" className="block font-mono text-xl text-green-300">
                Branch
            </label>
            <select
                id="department"
                name="department"
                value={state.department}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            >
                <option value="Mech">Mechanical Engineering</option>
                <option value="CSE">Computer Science Engineering</option>
                <option value="IS">Information Science</option>  
                <option value="ECE">Electronic and Communication Engineering</option> 
                <option value="Bio">Science and Humanities</option>
                <option value="AI/ML">AI/ML</option>

            </select>
            </div>

            <FormField
                labelName="Club Id"
                type="text" 
                id="club_Id"
                name="club_Id"
                placeholder="Enter the respective club id"
                value={state.club_Id}
                onChange={handleInputChange}
            />

            <div className='float-right'>
              <input type="submit" value="Save" className='bg-purple-300 font-bold px-4 py-2 rounded-md'/>
            </div>
        </form>
    </div>
  )
}

export default AddFaculty