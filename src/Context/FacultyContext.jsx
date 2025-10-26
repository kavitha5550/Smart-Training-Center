import {createContext, useState,useEffect } from "react";


export const FacultyContext=createContext();
export function FacultyProvider({children}){

    const[faculty,setFaculty]=useState(null);
    const[isdarkMode,setIsDarkMode]=useState(false);
     const toggle=()=>{
       setIsDarkMode((prev)=>!prev);
    }
    const theme=isdarkMode?'dark':'light';
    useEffect(() => {
     document.documentElement.setAttribute('data-theme',theme);
       }, [isdarkMode]);
   
    return(
    <FacultyContext.Provider value={{faculty,setFaculty,theme,toggle}}>
        
   {children}
    </FacultyContext.Provider>
    )
}