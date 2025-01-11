import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "12dfgfdbfgghnhnfnhg"
const daysAgoFunction = (mongodbTime) =>{
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDiffernce = currentTime - createdAt;
  return Math.floor(timeDiffernce/(1000*24*60*60));
}
  
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'> 
     <p className='text-sm text-gray-600' >{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)}`} days ago</p>
     <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
     </div>
     <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <AvatarImage src={job?.company?.logo}/>
            </Avatar>
        </Button>
        <div>
            <h1>{job?.company?.name}</h1>
            <p>India</p>
        </div>
     </div>

     <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
     </div>
     <div className='flex items-center gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)} >Details</Button>
        <Button className="bg-purple-600 ">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job
