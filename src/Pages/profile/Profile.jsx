import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FacultyContext } from "../../Context/FacultyContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaUniversity,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";

const Profile = () => {
  const { faculty, setFaculty } = useContext(FacultyContext);
  const [FacultyDetails, setFacultyDetails] = useState([]);

  useEffect(() => {
    if (!faculty) {
      const token = localStorage.getItem("token");
      if (token) {
        const decode = jwtDecode(token);
        setFaculty({
          facultyId: decode.factid,
          facultyname: decode.factname,
          facultyrole: decode.factrole,
        });
      }
    }
  }, [faculty, setFaculty]);

  useEffect(() => {
    if (faculty?.facultyId) {
      axios
        .post("http://localhost:5002/facultyprofile", {
          factId: faculty.facultyId,
        })
        .then((res) => {
          setFacultyDetails(res.data.data);
        })
        .catch((err) => {
          console.log("server err", err);
        });
    }
  }, [faculty]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {faculty ? (
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: "var(--color-fg)" }}
        >
          Welcome, {faculty.facultyname}
        </h2>
      ) : (
        <p></p>
      )}

      {FacultyDetails.length > 0 &&
        FacultyDetails.map((f, index) => (
          <div
            key={index}
            className="shadow-lg rounded-2xl p-6 flex gap-6 transition"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--sidebar-bg)",
              color: "var(--color-fg)",
            }}
          >
            {/* Profile Photo */}
            <div className="p-5">
              <img
                src={`http://localhost:5002/Profile/${f.photograph}`}
                alt="Faculty"
                className="w-32 h-32 rounded-full border-4 object-fill"
                style={{ borderColor: "var(--sidebar-hover)" }}
              />
            </div>

            {/* Faculty Info */}
            <div className="grid grid-cols-1 gap-3">
              <div className="grid col-span-2">
                <h3
                  className="text-xl font-bold flex items-center gap-2"
                  style={{ color: "var(--navbar-text)" }}
                >
                  <FaUser /> {f.factname} ({f.factrole})
                </h3>
              </div>

              <p className="flex items-center gap-2">
                <FaUniversity /> Branch: {f.branch}
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> {f.femailid}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone /> {f.mobilenumber}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> DOB:{" "}
                {new Date(f.dateofbirth).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <FaTransgender /> Gender: {f.gender}
              </p>
              <p className="flex items-center gap-2">
                <FaHome /> {f.address}, {f.city}
              </p>
              <p>Marital Status: {f.maritalstatus}</p>
              <p>Joined On: {new Date(f.dateofjoin).toLocaleDateString()}</p>
              <p>Experience: {f.previousexp} yrs</p>
              <p>Aadhaar: {f.adhaarno}</p>
              <p>Parent/Spouse: {f.parent_spouse_name}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;

