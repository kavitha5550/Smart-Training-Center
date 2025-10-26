import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { Landmark, UserRoundPen, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Modify = () => {
  const [BatchCode, setBatchCode] = useState("");
  const [getdata, setGetData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchDetails, setBatchDetails] = useState({});
  const [studentList, setStudentList] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [modifyFaculty, setModifyFaculty] = useState("");
  const [ModifyDO, setModifyDO] = useState("");
  const [ModifyTM, setModifyTM] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [batchtime, setBatchTime] = useState([]);
  const options = ["Daily", "MWF", "TTS", "Week End"];

  // Fetch active batches
  useEffect(() => {
    axios.post("http://localhost:5002/batchactive")
      .then(res => setGetData(res.data.data))
      .catch(console.log);
  }, []);
 const fetchUnassignedStudents = () => {
    axios.get("http://localhost:5002/unassigned-students")
      .then(res => setAllStudents(res.data.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchUnassignedStudents();
  }, []);

  // Fetch faculty
  useEffect(() => {
    axios.get("http://localhost:5002/facultylist")
      .then(res => setFacultyList(res.data.data))
      .catch(console.log);
  }, []);

  // Fetch timeslots
  useEffect(() => {
    axios.post("http://localhost:5002/batchtime")
      .then(res => setBatchTime(res.data.data))
      .catch(console.log);
  }, []);

  // Fetch unassigned students with course names
  useEffect(() => {
    axios.get("http://localhost:5002/unassigned-students")
      .then(res => setAllStudents(res.data.data))
      .catch(console.log);
  }, []);

  // Fetch batch details & assigned students
  useEffect(() => {
    if (!BatchCode) return;

    const batch = getdata.find(b => b.batchcode === BatchCode);
    setSelectedBatch(batch || null);

    axios.post("http://localhost:5002/batchdetails", { BatchCode })
      .then(res => setBatchDetails(res.data.data))
      .catch(console.log);

    axios.post("http://localhost:5002/batchstudents", { BatchCode })
      .then(res => setStudentList(res.data.data))
      .catch(console.log);
  }, [BatchCode, getdata]);

  // Filter available students by batch course
const availableStudents = allStudents.filter(
  s => !studentList.some(asg => asg.regid === s.regid) &&
       (!selectedBatch || s.course_name === selectedBatch.course)
);


  const handleBatchChange = e => setBatchCode(e.target.value);

  const modifyBatch = () => {
    if (!selectedBatch) return;
    axios.post("http://localhost:5002/mfaculty", {
      modifyFaculty,
      ModifyTM,
      ModifyDO,
      batch: selectedBatch.batchcode
    })
      .then(res => {
        window.alert(res.data.message);
        setBatchDetails(res.data.data);
      })
      .catch(err => {
        window.alert(err.response?.data?.message || "Something went wrong!");
      });
  };

  const addStudentToBatch = (student) => {
    if (!selectedBatch) return;
    axios.post("http://localhost:5002/addstudenttobatch", {
      batchcode: selectedBatch.batchcode,
      regid: student.regid,
      student_name: student.student_name
    })
      .then(res => {
        window.alert(res.data.message);
        setStudentList(prev => [...prev, student]);
        setAllStudents(prev => prev.filter(s => s.regid !== student.regid)); // remove from available
        setBatchDetails(prev => ({ ...prev, studentcount: prev.studentcount + 1 }));
      })
      .catch(err => {
        window.alert(err.response?.data?.message || "Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-12">

      {/* Active Batches */}
      <motion.div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <Landmark className="mr-2 text-indigo-600" /> Active Batches
        </h2>
        <select
          onChange={handleBatchChange}
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        >
          <option value="">-- Select Batch --</option>
          {getdata.map((b, i) => (
            <option key={i} value={b.batchcode}>{b.batchcode}</option>
          ))}
        </select>
        <AnimatePresence>
          {selectedBatch && (
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-indigo-50 p-4 rounded-xl">
                <label className="text-gray-500 text-sm">Course</label>
                <p className="text-lg font-semibold mt-1">{batchDetails.course}</p>
              </div>
              <div className="bg-white shadow p-4 rounded-xl border hover:border-indigo-800 transition">
                <label className="text-gray-500 text-sm flex items-center">
                  <FaUserGraduate className="mr-2 text-indigo-600" /> Student Count
                </label>
                <p className="text-lg font-semibold">{batchDetails.studentcount}</p>
              </div>
              <div className="bg-white shadow p-4 rounded-xl border hover:border-indigo-800 transition">
                <label className="text-gray-500 text-sm flex items-center">
                  <RiBook2Fill className="mr-2 text-green-600" /> Faculty
                </label>
                <p className="text-lg font-semibold">{batchDetails.facultyname}</p>
              </div>
              <div className="bg-white shadow p-4 rounded-xl border hover:border-indigo-800 transition">
                <label className="text-gray-500 text-sm flex items-center">
                  <MdAccessTime className="mr-2 text-pink-600" /> Timeslot
                </label>
                <p className="text-lg font-semibold">{batchDetails.timeslot}</p>
              </div>
              <div className="bg-white shadow p-4 rounded-xl border hover:border-indigo-800 transition">
                <label className="text-gray-500 text-sm flex items-center">
                  <MdDateRange className="mr-2 text-orange-600" /> Day Order
                </label>
                <p className="text-lg font-semibold">{batchDetails.dayorder}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modify Batch */}
      <motion.div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <UserRoundPen className="mr-2 text-indigo-600" /> Modify Batch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-gray-500 mb-2">Faculty</label>
            <select onChange={e => setModifyFaculty(e.target.value)}
              className="border rounded-lg px-3 py-2 outline-none">
              <option value="">-- Select Faculty --</option>
              {facultyList.map(f => (<option key={f.factid} value={f.factid}>{f.factname}</option>))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 mb-2">Timeslot</label>
            <select onChange={e => setModifyTM(e.target.value)}
              className="border rounded-lg px-3 py-2 outline-none">
              <option value="">-- Select Timeslot --</option>
              {batchtime.map((b, i) => (<option key={i} value={b.timing}>{b.timing}</option>))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 mb-2">Day Order</label>
            <select onChange={e => setModifyDO(e.target.value)}
              className="border rounded-lg px-3 py-2 outline-none">
              <option value="">-- Select Day Order --</option>
              {options.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <motion.button onClick={modifyBatch}
            className="flex items-center bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-2 rounded gap-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LogIn size={15} /> Modify
          </motion.button>
        </div>
      </motion.div>

      {/* Available Students */} {selectedBatch && (
      <motion.div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <FaUserGraduate className="mr-2 text-indigo-600" /> Add Students
        </h2>
        {availableStudents.length === 0 ? (
          <p className="text-gray-500">No unassigned students available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableStudents.map(s => (
              <motion.div key={s.regid} className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md"
                whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <div>
                  <div>{s.student_name} ({s.regid})</div>
                  <div className="text-gray-600 text-sm">{s.course_name}</div>
                </div>
                <button onClick={() => addStudentToBatch(s)}
                  className="bg-indigo-800 text-white px-3 py-1 rounded hover:bg-indigo-700">
                  Add
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>)}

      {/* // /* Assigned Students */ }
      {selectedBatch && (
      <motion.div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
          <FaUserGraduate className="mr-2 text-green-600" /> Assigned Students
        </h2>
        {studentList.length === 0 ? (
          <p className="text-gray-500">No students assigned yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentList.map(s => (
              <div key={s.regid} className="flex justify-between items-center p-3 border rounded-lg bg-green-50">
                <div>
                  <div>{s.student_name} ({s.regid})</div>
                  <div className="text-gray-600 text-sm">{s.course_name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      )}
    </div>
  );
};

export default Modify;

