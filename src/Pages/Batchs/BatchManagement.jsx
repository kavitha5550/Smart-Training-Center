import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { FaClock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const BatchManagement = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [timeslot, setTimeSlot] = useState([]);
  const [timeslotshow, setTimeSlotShow] = useState("");
  const [factassess, setFactAssess] = useState([]);
  const [factAsdata, setFactAsData] = useState("");
  const [dayOrder, setDayOrder] = useState("");
  const [bcode, setBcode] = useState("");
  const [branchname, setBranchName] = useState([]);
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [studentdetails, setStudentDetails] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [batchcode, setBatchCode] = useState("");
  const [batchCreated, setBatchCreated] = useState(false);
  const [factid, setFactId] = useState("");
  const [assigning, setAssigning] = useState(false); // prevent multiple clicks

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const firstDay = `${year}-${month}-01`;
  const regex = new RegExp(`^${year}-${month}-\\d{2}$`);

  useEffect(() => {
    axios.post("http://localhost:5002/courses")
      .then(res => setCourses(res.data.data))
      .catch(console.log);
    axios.post("http://localhost:5002/timeslot")
      .then(res => setTimeSlot(res.data.data))
      .catch(console.log);
    axios.post("http://localhost:5002/factassess")
      .then(res => setFactAssess(res.data.data))
      .catch(console.log);
    axios.post("http://localhost:5002/branchdata")
      .then(res => setBranchName(res.data.branch))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (!selectedCourse?.course_id) return;
    setLoadingStudents(true);
    axios.post('http://localhost:5002/courseid', { courseId: selectedCourse.course_id })
      .then(res => setStudentDetails(res.data.data))
    
      .catch(console.log)
      .finally(() => setLoadingStudents(false));
  }, [selectedCourse]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setFactId(jwtDecode(token).factid);
  }, []);

  const handleCheckboxChange = (name) => {
    setSelectedStudents(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
    console.log(selectedStudents)
  };

  const assignBatch = async (e) => {
    e.preventDefault();
    if (assigning) return; // prevent multiple clicks
    setAssigning(true);

    const scount = selectedStudents.length;
    console.log(bcode,
        selectedStudents,
        selectedCourse,
        timeslotshow,
        factAsdata,
        dayOrder,
        scount,
        startdate)
    try {
      const res = await axios.post('http://localhost:5002/batchassign', {
        bcode,
        selectedStudents,
        selectedCourse,
        timeslotshow,
        factAsdata,
        dayOrder,
        scount,
        startdate,
        enddate,
        studentdetails
      });
      toast.success(res.data.message);
      console.log(res.data.data)
      if (res.data.data) {
        setBatchCode(res.data.data.batchcode);
        setBatchCreated(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-indigo-800 mb-4">Batch Management</h1>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Select Course<span className="text-red-500">*</span></label>
          <select value={selectedCourse?.course_id || ""} onChange={(e) => setSelectedCourse(courses.find(c => c.course_id === Number(e.target.value)))}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800">
            <option value="">--Select--</option>
            {courses.map(c => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
          </select>
        </div>

        {/* Time Slot */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Time Slot<span className="text-red-500">*</span></label>
          <select value={timeslotshow} onChange={(e) => setTimeSlotShow(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800">
            <option value="">--Select--</option>
            {timeslot.map((s, i) => <option key={i} value={s.timing}>{s.timing}</option>)}
          </select>
        </div>

        {/* Faculty */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Faculty<span className="text-red-500">*</span></label>
          <select value={factAsdata} onChange={(e) => setFactAsData(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800">
            <option value="">--Select--</option>
            {factassess.filter(f => f.course_id === selectedCourse?.course_id)
              .map(f => <option key={f.factid} value={f.factid}>{f.factname} ({f.factid})</option>)}
          </select>
        </div>

        {/* Day Order */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Day Order<span className="text-red-500">*</span></label>
          <select value={dayOrder} onChange={(e) => setDayOrder(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800">
            <option value="">--Select--</option>
            <option value="Daily">Daily</option>
            <option value="MWF">MWF</option>
            <option value="TTS">TTS</option>
            <option value="Week End">Week End</option>
          </select>
        </div>

        {/* Branch Code */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Branch Code<span className="text-red-500">*</span></label>
          <select value={bcode} onChange={(e) => setBcode(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800">
            <option value="">--Select--</option>
            {branchname.map((b, i) => <option key={i} value={b.branchcode}>{b.branchcode}</option>)}
          </select>
        </div>

        {/* Start Date */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">Start Date<span className="text-red-500">*</span></label>
          <input type="date" value={startdate} min={firstDay} onChange={(e) => {
            setStartDate(e.target.value);
            if (!regex.test(e.target.value)) toast.error(" Invalid date (not in current month)");
          }}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800" />
        </div>

        {/* End Date */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <label className="font-semibold">End Date<span className="text-red-500">*</span></label>
          <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded focus:outline-none focus:border-indigo-800" />
        </div>
      </div>

      {/* Students */}
 

<div className="bg-white p-4 rounded-xl shadow-md">
  <label className="font-semibold">
    Students <span className="text-red-500">*</span>
  </label>

  <div className="mt-2 max-h-64 overflow-y-auto border rounded p-2">
    {loadingStudents ? (
      <div className="flex items-center justify-center gap-2 text-gray-500 py-4">
        <Loader2 className="animate-spin w-5 h-5" />
        <span>Loading students...</span>
      </div>
    ) : studentdetails.length === 0 ? (
      <p className="text-gray-400 text-center py-4">No students available</p>
    ) : (
      studentdetails.map((student) => (
        <div
          key={student.regid}
          className="flex items-center gap-2 p-1 hover:bg-indigo-50 rounded"
        >
          <input
            type="checkbox"
            checked={selectedStudents.includes(student.student_name)}
            onChange={() => handleCheckboxChange(student.student_name)}
          />
          <span>
            {student.student_name} ({student.regid})
          </span>
        </div>
      ))
    )}
  </div>
</div>


      {/* Assign Button */}
      <div className="flex justify-end">
        <button disabled={assigning} onClick={assignBatch}
          className={`flex items-center space-x-2 px-6 py-2 rounded-xl text-white transition ${assigning ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-800 hover:bg-indigo-700"}`}>
          <FaClock />
          <span>{assigning ? "Assigning..." : "Assign Batch"}</span>
        </button>
      </div>
    </div>
  );
};

export default BatchManagement;
