import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '../../redux/jobSlice.js';
// const randomJobs = [1,2,4,5,6,7 ];

const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
            
             {
      allJobs.map((job)=>{
        return(
          <Job key={job._id} job={job}/>
        )
      })
      }
             
        </div>
      </div>
    </div>
  )
}

export default Browse
