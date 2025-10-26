import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Student = () => {
  const[userData,setUserData]=useState([])

  useEffect(()=>{
    axios.post('http://localhost:5002/batches')
    .then((res)=>{
        setUserData(res.data.value)
        
    })
    .catch((err)=>{

    })
  })

  return (
<table className="min-w-full table-fixed border border-gray-300 rounded-md">
  <thead className="bg-indigo-800 text-white">
    <tr>
      <th className="w-1/3 px-4 py-2 text-left">Faculty</th>
      <th className="w-1/3 px-4 py-2 text-left">Batch Code</th>
      <th className="w-1/3 px-4 py-2 text-left">Time Slot</th>
    </tr>
  </thead>
  <tbody>
    {userData.map((d, index) => (
      <tr key={index} className="border-b">
        <td className="w-1/3 px-4 py-2">{d.faculty}</td>
        <td className="w-1/3 px-4 py-2">{d.batchcode}</td>
        <td className="w-1/3 px-4 py-2">{d.timeslot}</td>
      </tr>
    ))}
  </tbody>
</table>




  )
}

export default Student
