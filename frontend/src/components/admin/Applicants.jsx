import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { Application_API_END_POINT } from '../../../utils/constant.js'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../../redux/applicationSlice.js'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application)
  useEffect(()=>{
    const fetchApplicants = async () =>{
      try{
   const res = await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});
   console.log(res.data)
   if(res.data.success){
dispatch(setAllApplicants(res.data.job))
   }
      }catch(error){
        console.log(error);
        
      }
    }
    fetchApplicants()
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants.applications.length}</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
