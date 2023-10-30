import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { FormField } from '../components' 
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    clubName: "",
    description: "", 
    socMed:"",
    email: ""
};

const UpdateClub = () => {

  const [state, setState] = useState(initialState);

  const { clubName, description, socMed, email } = state;

  const {id} = useParams(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }; 

  const handleSend = async (e) => {

    e.preventDefault();
    // console.log(userName);

    if (!clubName || !email || !socMed || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    axios.put(`http://localhost:5000/api/update-club/${id}`,{
            clubName,
            description,
            socMed, 
            email,
        })
        .then(()=>{
            toast.success("Updated successfully");
            setState({clubName: "", description:"", socMed:"", email: ""});
        })
        .catch((err) => toast.error(err.response.data));
  }

  return (
    <div>  
        <div className='flex justify-center mt-[0.25%] mb-[2%]'>
            <h1 className='font-mono text-2xl'> UPDATE CLUB </h1>
        </div>
        <form className='mr-[20%] ml-[20%] mt-[2%]' onSubmit={handleSend}>
            <FormField
                labelName="Club Name"
                type="text" 
                id="clubName"
                name="clubName"
                placeholder="Enter club name"
                value={state.clubName}
                onChange={handleInputChange}
            />

            <FormField
                labelName="Description"
                type="text" 
                id="description"
                name="description"
                placeholder="A one line description about the club "
                value={state.description}
                onChange={handleInputChange}
            /> 

            <FormField
                labelName="Social Media Handles"
                type="text" 
                id="socMed"
                name="socMed"
                placeholder="https://instagram.com/"
                value={state.socMed}
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

            <div className='float-right'>
              <input type="submit" value="Update" className='bg-[#ffbfbb] px-2 py-2 rounded-md'/>
            </div>
        </form>
    </div>
  )
}

export default UpdateClub