import React,{useEffect,useState} from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Attendance = () => {
   const [factid, setFactId] = useState("");
    const [batches, setBatches] = useState([]);
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setFactId(decode.factid);

      axios
        .post("http://localhost:5002/batchandstudentlist", {
          factid: decode.factid,
        })
        .then((res) => {
          setBatches(res.data.data || []);
        })
        .catch((err) => {
          console.log("batch fetch error", err);
        });
    }
  }, []);
  return (
    <div>




    </div>
  )
}

export default Attendance