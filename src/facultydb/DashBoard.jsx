import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaPlusCircle, FaTrash } from "react-icons/fa";
  


const DashBoard = () => {
   const loc=useLocation();
    const[message,setmessage]=useState("");
      const[photos,setPhotos]=useState([])
      const userdatavalue1=loc.state?.userdatavalue1
     useEffect(()=>{
       
       axios.post('http://localhost:5002/user',{userdatavalue1})
       .then((res)=>{
        setmessage(res.data.message);
        setPhotos(res.data.photograph);
        
       })
       .catch((error)=>{
          if(error.response&&error.response.data&&error.response.data.message){
            setmessage(error.response.data.message)
          }
       })
      },
     
      [])
  
  const[view,setView]=useState(false);
  const[remove,setRemove]=useState(false);
  const[factid,setfactid]=useState('');
 const [active, setActive] = useState("home");
 const[msg,setMsg]=useState('');
 const[msgtype,setMsgType]=useState('');
 const[dbpersonaldetails,setDBPersonalDetails]=useState();
 const [categories, setCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({ known: [], teach: [] });







  const [bData, setBData] = useState({
    bankname: '',
    branchname: '',
    accountholdername: "",
    accounttype: "",
    ifsccode: "",
    accountnumber: "",
    pancardnumber: ""
  });
 
  axios.post('http://localhost:5002/dbpersonaldetails',{userdatavalue1})
  .then((res)=>{
  setDBPersonalDetails(res.data.data)
  }).catch((err)=>{
 console.log(err)
  })

  


  const[formData,setFormData]=useState([{
     fname:'',
     degree:'',
     course:'',
     collegename:'',
     yearofpassing:'',
     percentage:''
   }])
   const BankData = (e) => {
  const { name, value } = e.target;
  setBData(prevData => {
    const updated = { ...prevData, [name]: value };
    console.log("Updated bData:", updated);
    return updated;
  });
};

  const BankDetails = (e) => {
  e.preventDefault();
  const banknameregex=/^[A-Za-z]$/
  if(!banknameregex.test(bData.bankname)){
    setMsg('invaild bank name')
  }
  const branchnameregex=/^[A-Za-z]$/
  if(!branchnameregex.test(bData.branchnameregex)){
    setMsg('invaild branch name')
  }

  const accountholdernameregex=/^[A-Za-z]$/  
  if(!accountholdernameregex.test(bData.accountholdername)){
    setMsg('invaild account holder name')
  }

  const accounttyperegex=/^[A-Za-z]$/
  if(!accounttyperegex.test(bData.accounttype)){
    setMsg('invaild accout type')
  }

  const ifsccoderegex=/^[A-Z]{4}0\[1-9]{6}$/
  if(!ifsccoderegex.test(bData.ifsccode)){
    setMsg('invaild ifsccode')
  }

  const accountnumberregex=/^\d{9,18}$/
  if(!accountnumberregex.test(bData.accountnumber)){
    setMsg('invaild accountnumber')
  }

  const pancardnumberregex=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  if(!pancardnumberregex.test(bData.pancardnumber)){
    setMsg('invaild pan number')
  }
  axios.post('http://localhost:5002/fbank',  bData)
    .then(res => {
      console.log("Inserted:", res.data);
    })
    .catch(err => console.error("Error:", err));
};
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5002/feducation", { education })
      .then((res) => {
        console.log("Inserted:", res.data);
        alert("Education details inserted successfully!");
      })
      .catch((err) => console.error("Error:", err));
  };

 const handleAdd = () => {
    setFormData([
      ...formData,
      {
        fname: "",
        degree: "",
        course: "",
        collegename: "",
        yearofpassing: "",
        percentage: ""
      }])}
 const handleRemove = (index) => {
    const updatedForm = [...formData];
    updatedForm.splice(index, 1);
    setFormData(updatedForm);
  };

  const viewfactid=(userdatavalue1)=>{
    setfactid(userdatavalue1)
    setView(true)
  }
  const removefactid=()=>{
    setfactid('')
    setRemove(false)
  }

const skillset = (e) => {
const{value,checked}=e.target;
if(checked){
  setSCategory([...scategory,value])
  console.log(scategory)
}else{
setSCategory([...scategory.filter(remove=>{remove!==value})])
}
};

  

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, facRes] = await Promise.all([
          axios.get("http://localhost:5002/skills"),
          axios.get("http://localhost:5002/faculty-skills",
           { params:{userdatavalue1}}
          )
        ]);

        setCategories(catRes.data);

        // Map DB values into state
        const known = facRes.data.filter(s => s.readiness_status === 0).map(s => s.skill_id);
        const teach = facRes.data.filter(s => s.readiness_status === 1).map(s => s.skill_id);

        setSelectedSkills({ known, teach });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);


  const handleCheckboxChange = (section, skillId) => {
    setSelectedSkills(prev => {
      const current = prev[section];
      return {
        ...prev,
        [section]: current.includes(skillId)
          ? current.filter(id => id !== skillId)
          : [...current, skillId]
      };
    });
  };

  const handleUpdate = async () => {
    try {
      const skills = [
        ...selectedSkills.known.map(id => ({ skill_id: id, readiness_status: 0 })),
        ...selectedSkills.teach.map(id => ({ skill_id: id, readiness_status: 1 }))
      ];

      await axios.post("http://localhost:5002/faculty-skills/update", {
        userdatavalue1,
        skills
      });

      alert("Skillset updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating skills");
    }
  }


  return (
    <div>
  
      <div className='flex  text-xl'>
       
    <div className='md:w-full shadow-lg px-3 '>
       <div className='bg-blue-50'>
    
      <div className='flex justify-center align-center w-full '>
        <div className='p-3 flex flex-col  rounded-md mt-2 '>
        {photos.map((p,index)=>(
       <div className='flex justify-center'>
           <img  className='w-26 p-2 rounded-full h-26' key={index} src={p.photograph}/>
       </div>
        ))}
<div className='w-5xl'>
     {dbpersonaldetails && (
  <div className="p-2  shadow-lg rounded-2x ">
    <h2 className="text-2xl w-5xl font-pop font-bold text-indigo-800 mb-5 border-b pb-2">
      Faculty Personal Details
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Name:</span> {dbpersonaldetails.factname}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Role Name:</span> {dbpersonaldetails.factid}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Branch Name:</span> {dbpersonaldetails.branch}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Email:</span> {dbpersonaldetails.femailid}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Aadhar Number:</span> {dbpersonaldetails.adhaarno}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Contact Number:</span> {dbpersonaldetails.mobilenumber}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Gender:</span> {dbpersonaldetails.gender}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">DOB:</span> {dbpersonaldetails.dateofbirth ? new Date(dbpersonaldetails.dateofbirth).toISOString().split("T")[0] : ""}

      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Date Of Joining:</span> {dbpersonaldetails.dateofjoin ? new Date(dbpersonaldetails.dateofjoin).toISOString().split("T")[0] : ""}

      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">Parent Name:</span> {dbpersonaldetails.parent_spouse_name}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <span className="font-semibold text-gray-600">City:</span> {dbpersonaldetails.city}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-600">Marital Status:</span> {dbpersonaldetails.maritalstatus}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm col-span-1 sm:col-span-2">
        <span className="font-semibold text-gray-600">Address:</span> {dbpersonaldetails.address}
      </div>
      
    </div>
    <div className='text-end p-2'>
        <button className='px-6 py-3 bg-indigo-800 text-white text-lg font-semibold rounded-xl shadow hover:bg-indigo-700 transition'>Update</button>
      </div>
  </div>
)}
</div>

      </div>
      </div>
       <div className="max-w-5xl mx-auto p-5 bg-blue-50 shadow-lg rounded-xl ">
      <h2 className="text-2xl  text-indigo-800 font-bold mb-5 border-b pb-2 flex items-center justify-between">
        Education Details
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center font-pop text-lg"
        >
          <FaPlusCircle className="mr-2" /> Add Education
        </button>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 ">
        {formData.map((edu, index) => (
          <div
            key={index}
            className="p-4 px-2  rounded-lg shadow-sm bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
          >
           <div> <span className='text-sm font-pop tracking-wide px-2 py-2'> Name<label className='text-red-400'>*</label></span><input
              type="text"
              name="fname"
              placeholder="Name"
              value={edu.fname}
              onChange={(e) => handleChange(index, e)}
              className="p-4 border  hover:border focus:hidden hover:border-indigo-800  rounded-lg w-full"
            /></div>
            <div>
              <span className='text-sm font-pop tracking-wide px-2 py-2'>Degree<label className='text-red-400'>*</label></span>
              <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(index, e)}
              className="p-4 border focus:hidden hover:border hover:border-indigo-800  rounded-lg w-full"
            />
              </div>
            <div>
                <span className='text-sm font-pop tracking-wide px-2 py-2'> Course<label className='text-red-400'>*</label></span>
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={edu.course}
              onChange={(e) => handleChange(index, e)}
              className="p-4 border focus:hidden hover:border hover:border-indigo-800  rounded-lg w-full"
            />
            </div>
             <div><span className='text-sm font-pop tracking-wide px-2 py-2'> College Name<label className='text-red-400'>*</label></span>
            <input
              type="text"
              name="collegename"
              placeholder="College Name"
              value={edu.collegename}
              onChange={(e) => handleChange(index, e)}
              className="p-4 focus:hidden  hover:border hover:border-indigo-800  border rounded-lg w-full"
            />
              </div>
                <div><span className='text-sm font-pop tracking-wide px-2 py-2'> Year of Passing<label className='text-red-400'>*</label></span>
          
            <input
              type="number"
              name="yearofpassing"
              placeholder="Year of Passing"
              value={edu.yearofpassing}
              onChange={(e) => handleChange(index, e)}
              className="p-4 focus:hidden hover:border hover:border-indigo-800  border rounded-lg w-full appearance-none no-arrows"
            />
            </div>
             <div><span className='text-sm font-pop tracking-wide px-2 py-2'> Percentage<label className='text-red-400'>*</label></span>
            <input
              type="text"
              name="percentage"
              placeholder="Percentage"
              value={edu.percentage}
              onChange={(e) => handleChange(index, e)}
              className="p-4 border focus:hidden rounded-lg w-full hover:border hover:border-indigo-800 "
            /></div>

           <div className='grid col-span-2'>
          <div className='flex justify-end'>
             {formData.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className=" text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            )}
          </div>
            <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-800 text-white text-lg font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
           Update
          </button>
        </div>
           </div>
          </div>
        ))}

      
      </form>
      <div className='container'>
      <div className="flex  justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={BankDetails}
        className="bg-white w-300  md:-mt-20 shadow-lg rounded-2xl p-6 px-10 "
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-800">🏦 Bank Details</h2>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-3  '>
         <div>
          <span className='text-sm font-pop tracking-wide px-2 py-2'>Bank Name<label className='text-red-400'>*</label></span>
           <input
          type="text"
          name="bankname"
          placeholder="Bank Name"
          value={bData.bankname}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
          required
        />
         </div>
<div>
          <span className='text-sm font-pop tracking-wide px-2 py-2'>Bank Name<label className='text-red-400'>*</label></span>
        <input
          type="text"
          name="branchname"
          placeholder="Branch Name"
          value={bData.branchname}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
          required
        />
</div>
        <div>
          <span className='text-sm font-pop tracking-wide px-2 py-2'>Account Holder Name<label className='text-red-400'>*</label></span>        
        <input
          type="text"
          name="accountholdername"
          placeholder="Account Holder Name"
          value={bData.accountholdername}
          onChange={BankData}
          className="border  focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
          required
        />
</div>
 <div><span className='text-sm font-pop tracking-wide px-2 py-2'>Bank Name<label className='text-red-400'>*</label></span>
        <select
          name="accounttype"
          value={bData.accounttype}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
        >
          <option disabled value=''>--Select--</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select></div>
 <div><span className='text-sm font-pop tracking-wide px-2 py-2'>IFSC Code<label className='text-red-400'>*</label></span>
        <input
          type="text"
          name="ifsccode"
          placeholder="IFSC Code"
          value={bData.ifsccode}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
          required
        /></div>
<div> <span className='text-sm font-pop tracking-wide px-2 py-2'>Account Number<label className='text-red-400'>*</label></span>
        <input
          type="number"
          name="accountnumber"
          placeholder="Account Number"
          value={bData.accountnumber}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3 appearance-none"
          required
        /></div>
<div> <span className='text-sm font-pop tracking-wide px-2 py-2'>PAN Card Number<label className='text-red-400'>*</label></span>
        <input
          type="text"
          name="pancardnumber"
          placeholder="PAN Card Number"
          value={bData.pancardnumber}
          onChange={BankData}
          className="border focus:hidden hover:border  hover:border-indigo-800 p-4 rounded-lg w-full mb-3"
          required
        /></div>

       <div className='text-end py-2'> <button
          type="submit"
          className="px-6 py-3 bg-indigo-800 text-white text-lg font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Update
        </button></div>
        </div>
        {msg&&(
          <div>
         <p style={{color:msgtype==='success'?'green':'red'}}>{msg}</p>
          </div>
        )}
      </form>
    </div></div>
       <div className=' bg-white shadow-lg rounded-md'>
   
 <div className="p-8 bg-gray-50 min-h-screen">
     

      {/* Section 1: Skills Known */}
      <div>
        <h3 className="text-2xl font-pop font-semibold text-indigo-800 mb-4">
          Skills 
        </h3>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="mb-8 p-6 bg-white shadow-md rounded-2xl hover:border hover:border-indigo-400"
          >
            <h4 className="text-lg font-pop font-semibold text-gray-700 mb-3">
              {cat.categoryname}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cat.skills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 p-3 rounded-xl cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.known.includes(skill.id)}
                    onChange={() => handleCheckboxChange("known", skill.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
                  />
                  <span className="ml-3 text-gray-800 font-medium">
                    {skill.skillname}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section 2: Skills with Readiness to Teach */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
        Able to Guide
        </h3>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="mb-8 p-6 bg-white shadow-md rounded-2xl hover:border hover:border-indigo-800"
          >
            <h4 className="text-lg font-semibold font-pop   text-gray-900 mb-3">
              {cat.categoryname}
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cat.skills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 p-3 rounded-xl cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.teach.includes(skill.id)}
                    onChange={() => handleCheckboxChange("teach", skill.id)}
                    className="w-5 h-5 text-indigo-800 rounded focus:ring-2 focus:ring-indigo-400"
                  />
                  <span className="ml-3 text-gray-800 font-medium">
                    {skill.skillname}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={handleUpdate}
          className="button"
        >
          Update Skills
        </button>
      </div>
    </div>




     </div>
      
      </div>
    </div>
  
     </div>
    </div>
   
    
        
 
    </div>
  )
}

export default DashBoard 