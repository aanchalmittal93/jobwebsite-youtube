import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice.js";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading,user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
if(input.file){
  formData.append("file",input.file)
}
    try{
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }
    }catch(error){
  console.log(error);
  toast.error(error.response.data.message)
  
    }finally{
      dispatch(setLoading(false))
    }
    
  }
   useEffect(()=>{
      if(user){
        navigate("/")
      }
    })
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label>FullName</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Aanchal mittal"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email"
              onChange={changeEventHandler} placeholder="aanchalmittal123@gmail.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="text" name="phoneNumber" value={input.phoneNumber}
              onChange={changeEventHandler} placeholder="999999999" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password"
              onChange={changeEventHandler} placeholder="Enter password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input 
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="rr">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button>: <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className="text-sm">
            Already have an Account ?{" "}
            <Link to="/login" className="text-blue-600 text-sm">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
