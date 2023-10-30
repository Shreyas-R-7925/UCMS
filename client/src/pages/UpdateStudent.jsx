import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { FormField } from '../components' 
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    srn: "",
    name: "", 
    phone_number:"",
    email: "",
    dob:"",
    department:""
};

const UpdateStudent = () => {

  const [state, setState] = useState(initialState);

  const { srn, name, phone_number, email, dob, department } = state;

  const {id} = useParams(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }; 

  const handleSend = async (e) => {

    e.preventDefault();
    // console.log(userName);
    // console.log(department);
    if(!department)

    if (!srn || !email || !name || !phone_number || !dob || !department) {
      toast.error('Please fill in all fields');
      return;
    }

    axios.put(`http://localhost:5000/api/update-student/${id}`,{
            srn, 
            name, 
            phone_number, 
            email, 
            dob, 
            department,
        })
        .then(()=>{
            toast.success("Updated successfully");
            setState({srn: "", name: "", phone_number:"", email: "", dob:"", department:""});
        })
        .catch((err) => toast.error(err.response.data));
  }

  return (
    <div> 
        <div className='flex justify-center mb-[2%]'>
            <h1 className='font-mono text-2xl'> UPDATE STUDENT </h1>
        </div>
        <form className='mr-[20%] ml-[20%] mt-[2%]' onSubmit={handleSend}>
            <FormField
                labelName="Name"
                type="text" 
                id="name"
                name="name"
                placeholder="Your name"
                value={state.name}
                onChange={handleInputChange}
            />

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
                labelName="Phone Number"
                type="text" 
                id="phone_number"
                name="phone_number"
                placeholder="+91 - "
                value={state.phone_number}
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
                labelName="Date of Birth"
                type="date" 
                id="dob"
                name="dob"
                placeholder="DD-MM-YYYY"
                value={state.dob}
                onChange={handleInputChange}
            />  

            <div className="mb-4">
            <label htmlFor="department" className="block text-base text-gray-900">
                Branch
            </label>
            <select
                id="department"
                name="department"
                value={state.department}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
            >
                <option value="CSE">Computer Science Engineering</option>
                <option value="Info">Information Science</option>  
                <option value="ECE">Electronic and Communication Engineering</option> 
                <option value="Mech">Mechanical Engineering</option>
                <option value="Bio">Bio Technology</option>
                <option value="AI/ML">AI/ML</option>

            </select>
            </div>


            <div className='float-right'>
              <input type="submit" value="Update" className='bg-[#ffbfbb] mt-[2%] mb-[30%] px-2 py-2 rounded-md'/>
            </div>
        </form>
    </div>
  )
}

export default UpdateStudent