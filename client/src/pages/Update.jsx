import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { FormField } from '../components';
import { toast } from 'react-toastify';
import axios from 'axios';

// import {useHistory, useParams, Link} from "react-router-dom"; 


const initialState = {
  userName: "",
  password: "",
  email: ""
};

const Update = () => {
  const [state, setState] = useState(initialState);

  const { userName, email, password } = state; 

  const {id} = useParams();  

  // console.log("Id: ", id);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/`)
        .then((res) => {
          const userData = res.data[0];
          if (userData) {
            setState(userData);
          } else {
            console.error("User not found for ID:", id);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);
  
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    // console.log(userName);

    if (!userName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if(!id){
        axios.post("http://localhost:5000/api/post",{
            userName,
            password, 
            email,
        })
        .then(()=>{
            toast.success("Added successfully");
            setState({userName: "", password:"", email: ""});
        })
        .catch((err) => toast.error(err.response.data));
    }

    else{
      axios.put(`http://localhost:5000/api/update/${id}`,{
          userName,
          password, 
          email,
      })
      .then(()=>{
          toast.success("updated successfully");
          setState({userName: "", password:"", email: ""});
      })
      .catch((err) => toast.error(err.response.data));
  }


  };

  return (
    <section>
      <form className='mr-[20%] ml-[20%] mt-[2%]' onSubmit={handleSend}>
        <div className="inputContainer content-center">
          <div className='py-8'>
            <FormField
              labelName="Your Name"
              type="text" 
              id="name"
              name="userName"
              placeholder="Shreyas R"
              value={state.userName || ""}
              onChange={handleInputChange}
            />

            <FormField
              labelName="Password"
              type="text" 
              id="password"
              name="password"
              placeholder="Password"
              value={state.password || ""}
              onChange={handleInputChange}
            />

            <FormField
              labelName="Email"
              type="email" 
              id="email"
              name="email"
              placeholder="Email"
              value={state.email || ""}
              onChange={handleInputChange}
            />

            

            <div className='float-right'>
              <input type="submit" value={id ? "Update": "Save"} className='bg-[#ffbf00] px-2 py-2 rounded-md'/>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Update;
