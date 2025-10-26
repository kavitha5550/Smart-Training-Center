import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { BookOpen,HelpCircle, Hash, IdCard, GraduationCap, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Questios = () => {
    const[factid,setfactid]=useState('')
      const [batches, setBatches] = useState([]);
      const [students, setStudents] = useState([]);
      const navigate=useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            const decode=jwtDecode(token)
            setfactid(decode.factid)
        }
        axios
        .post("http://localhost:5002/batchandstudentlist", {
          factid
        })
        .then((res) => {
          setBatches(res.data.data || []);
        })
        .catch((err) => {
          console.log("batch fetch error", err);
        });
    })
    useEffect(() => {
    if (batches.length > 0) {
      axios
        .post("http://localhost:5002/studentlist", {
          batchcode: batches[0].batchcode,
        })
        .then((res) => {
          setStudents(res.data.data || []);
          console.log(students);
        })
        .catch((err) => {
          console.log("student fetch error", err);
        });
    }
  }, [batches]);

  const AddQuestions=((e)=>{
    navigate('/AddQuestions')

  })
  return (
    <div>
          <div className="flex items-center gap-2 mb-5">
        <BookOpen size={22} className="text-indigo-600" />
        <label className="font-pop text-xl text-gray-800 hover:text-gray-500">
          Upcoming Batches
        </label>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {batches.map((s, index) => (
          <div
            key={s.id}
            className="border rounded-2xl p-5 shadow-md hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-2 mb-3">
              <Hash size={18} className="text-indigo-600" />
              <span className="font-semibold text-gray-800">
                 {s.batchcode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <IdCard size={16} className="text-green-600" />
              <span className="text-sm">Reg Id: {s.regid}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <GraduationCap size={16} className="text-purple-600" />
              <span className="text-sm">Course: {s.course}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} className="text-orange-600" />
              <span className="text-sm">Time: {s.timeslot}</span>
            </div>
            <div className="flex items-center justify-end gap-2 text-gray-600">
              <HelpCircle size={16} className="text-orange-600" />
              <span onClick={AddQuestions} className="text-sm">AddQuestions</span>
            </div>
          </div>
        ))}
      </div> 
    </div>
  )
}

export default Questios