import React, {useState } from 'react'
import img from './images/logo1.jpg';
import img1 from './images/img1.jpg';
import img2 from './images/logo2.jpg';
import img3 from './images/logo3.jpg';
 import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
import axios from 'axios';
const SignUp = () => {
  const[userdata,setUserData]=useState({
    name:'',
    degree:'',
    email:'',
    dob:null,
    experience:'0',
    work:'',
   
   



  })
   const [selectedSkills, setSelectedSkills] = useState([]);
  const skills = ['HTML', 'JS', 'PYTHON', 'MYSQL, MONGODB', 'C, C++', 'CSS', 'JAVA'];
  const[showcontent,setShowContent]=useState(false);
    const[support,setSupport]=useState(false);
    const[div2,setdiv2]=useState(false);
    const [clear,setClear]=useState();
    const[file,setfile]=useState(null);
const handleClick = (skill) => {
  setSelectedSkills((prevSkills)=>{
    if(prevSkills.includes(skill)){
      return prevSkills.filter((s)=>{s!==skill})
    }
    return[...prevSkills,skill]
  })
  };

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setUserData({...userdata,[name]:value})

  }



const handleClear=()=>{
  
  console.log("button click")
  setUserData({
    name:'',
    degree:'',
    email:'',
    dob:'',
    experience:'',
    skils:'',

  })
  setfile({
    file:''
  })

 
}

    

    const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,
   autoplay: {
   delay: 5000,
 },

  // If we need pagination
 

  // Navigation arrows
 
  

  // And if we need scrollbar
 
});



const handleSubmit= async(e)=>{
   e.preventDefault();
//    const formData=new FormData();
// formData.append('name',name);
// formData.append('degree',degree);
// formData.append('email',email);
// formData.append('dob',dob);
// formData.append('experience',experience);
// formData.append('skills',skills);
// formData.append('file',file);
console.log('')
const submitData=new FormData()
   for (const key in userdata) {
      submitData.append(key, userdata[key]);
    }
    submitData.append('skills',selectedSkills.join(','))
   if(file){
     submitData.append('profilepic', file);

   }
  console.log(file)
  try{
const res=await axios.post('http://localhost:5001/formdata',submitData,{
  headers:{
    'Content-Type':'multipart/form-data'
  }
})
console.log('success',res.data)
  }catch(error){
 console.log('failed',error)
  }

}
  return (
        <div>
     <form>
         <nav className='w-full bg-gray-200   flex justify-between'>
        <div className='flex'>   <img src={img} alt="" className='w-20 px-2 py-2'/>
      <ul className='flex gap-2'>
        <li className='hover:border-b border-blue-700 p-5 '>Home</li>
        <li className='hover:border-b border-blue-700 p-5 '>Service</li>
        <li className='hover:border-b border-blue-700 p-5 '>About</li>
        <li className='hover:border-b border-blue-700 p-5 '>Contact</li>
      </ul>
    </div>
   <div className='flex align-center justify-center px-2 py-1'>
         <div className='flex  cursor-pointer hover:font-bold  transition-all duration-300 gap-2 items-center justify-center px-2 py-1 text-black hover:animate-pulse'  onMouseEnter={()=>{setShowContent(true)}} onMouseLeave={()=>{setShowContent(false)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" font-extralight size-4 mt-1 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  
</svg>
<p className='--font-display font-light text-sm'>Support</p>
</div>
    {showcontent &&(
<div className='absolute mt-10 px-2 py-2 bg-gray-100'>
   <p>Recent available courses</p>
</div>
    ) 
      
    }
 <div className="flex gap-1 py-4 cursor-pointer " onMouseEnter={()=>{setSupport(true)}} onMouseLeave={()=>{setSupport(false)}}>
     📢
    <p className='--font-display font-light text-sm'>News</p>
   
    </div>
    {support&&(
<div className='absolute mt-10 ml-20 px-2 py-2 bg-gray-100'>
   <p>Recent available courses</p>
</div>
    ) 
      
    }

   </div>


        </nav>
        <section className='sm-flex-col px-5 py-5 md:flex gap-3'>
          <div className='md:w-1/2  w-full border border-gray-200'>
          <label className='text-xl font-bold text-gray-600 hover:text-gray-500'>Personal Details</label>
          <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>Name</label>
          <input  type="text" className='border w-5/6 px-2 py-2 outline-none  hover:border-blue-800 placeholder-transparent rounded-xl ' name='name' value={userdata.name} onChange={handleChange} required/>
          </div>
           <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>Degree</label>
          <input type="text" className='border w-5/6 px-2 py-2 outline-none  hover:border-blue-800 placeholder-transparent rounded-xl ' name='degree' value={userdata.degree} onChange={handleChange} required />
          </div>
           <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label  className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>Email</label>
          <input  type="text" className='border w-5/6 px-2 py-2 outline-none  hover:border-blue-800 placeholder-transparent rounded-xl ' name='email' value={userdata.email} onChange={handleChange} required
          />
          </div>
           <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label  className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>DOB</label>
          <input type="date" className='border w-5/6 px-2 py-2 outline-none  hover:border-blue-800 placeholder-transparent rounded-xl ' name='dob' value={userdata.dob} onChange={handleChange} required/>
          </div>
          <label htmlFor="" className='text-xl font-bold text-gray-600 hover:text-gary-200'>Work Expericence</label>
           <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label  className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>Year</label>
         <select className='w-5/6 outline-none px-2 py-2'  name="experience" value={userdata.experience}
        onChange={handleChange}>
          <option>--Enter--</option>
          <option value="0-1">0</option>
          <option value="2-4">2</option>
          <option value="5+">5</option>
    

         </select>
          </div>
             <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label  className='floating-label text-gray-600 px-1 py-1 hover:text-gray-500 '>Company Details</label>
       <input type="text" placeholder='enter' className='border w-5/6 px-2 py-2 outline-none  rounded-xl hover:border-blue-800' name='work' value={userdata.work} onChange={handleChange} />
          </div>
            <label  className='floating-label text-gray-600 px-1 py-1 hover:text-gray-500 '>Skils</label>
           <div className='px-3 py-3 flex gap-5 flex-wrap'>
{skills.map((skill, index) => (
          <button
            key={index}
            onClick={() => handleClick(skill)}
            className={`px-4 py-2 border rounded-xl shadow-sm transition 
              ${
                selectedSkills.includes(skill)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-black hover:border-blue-800 hover:bg-blue-100'
              }`}
          >
            {skill}
          </button>
        ))}

</div>
  <div className='px-3 py-3 flex flex-col floating-label-group'>
            <label  className='floating-label gray-700 px-1 py-1 hover:text-gray-600 '>Resume</label>
          <input  type="file" accept='images/*' className='border w-5/6 px-2 py-2 outline-none  hover:border-blue-800 placeholder-transparent rounded-xl ' onChange={(e) => setfile(e.target.files[0])} 
          required
          />
          </div>











        
     
  
          
          </div>
          <div className='md:w-1/2  w-full  border border-gray-200  flex px-10 py-6  '>
          <div className='w-full border border-gray-200'>
            <div class="swiper h-75 w-100">
  
  <div class="swiper-wrapper">
   
    <div class="swiper-slide">
      <img src={img1} alt="" className='w-full h-full'/>
    </div>
    <div class="swiper-slide">
      <img src={img2} alt=""  className='w-full h-full'/>
    </div>
    <div class="swiper-slide">
      <img src={img3} alt="" className='w-100 h-full' />
    </div>
  
  </div>
  </div>
  
            <p className='--font-display text-2xl px-2 py-2 font-bold text-gray-600 hover:text-gray-500'>Profile</p>
            <div className='h-80  bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 py-5'>
              <div className='flex flex-col gap-5'>
                {userdata.name&&(
                  
         <div className='flex gap-2 mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
<p>{userdata.name}</p>

         </div>
       
                
              )}
              </div>
              <div className='flex gap-2'>
                {userdata.degree&&(
                  <div className='flex gap-2 mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
<p>{userdata.degree}</p>
                  </div>
                )}
              </div>
              {userdata.email&&(
                <div className='flex gap-2 mt-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
</svg>
<p>{userdata.email}</p>
                </div>
              )}
            {userdata.dob&&(
              <div className='flex gap-2 mt-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
<p>{userdata.dob}</p>
              </div>
            )}
            {userdata.experience&&(
              <div className='flex mt-1 gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
</svg>

                <p>{userdata.experience}</p>
              </div>
            )}
          {userdata.work&&(
            <div className='flex mt-2 gap-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
</svg>
<p>{userdata.work}</p>
</div>
          )}

 {selectedSkills.length >0 &&(
      <div className='mt-4 text-white font-semibold flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
</svg>
        
          <span>Selected Skills: {selectedSkills}</span>
    {/* {selectedSkills.map((skill, index) => (
      <span key={index} className="bg-green-600 px-2 py-1 rounded">
        {skill}
      </span>
    ))} */}
        </div>
  )}
                
            </div>
          
          
          </div>
          
          </div>
       
        </section>
   <div className='flex gap-5  align-center justify-center'>
      <input type="button"  className='hover:text-white font-mono px-3 py-2 bg-gray-500 hover:bg-gray-400 rounded' value="Clear " onClick={handleClear}/>
      <input type="button" value="submit" className='hover:text-white font-mono px-2 py-2 bg-blue-600 hover:bg-blue-500 rounded' onClick={handleSubmit} />
   </div>
     </form>

    </div>

  )
}

export default SignUp