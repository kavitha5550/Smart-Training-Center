import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [personalDetails, setPersonalDetails] = useState({
    branchname: "",
    role: "",
    name: "",
    email: "",
    dob: "",
    gender: "",
    adhaarno: "",
    doj: "",
    contactnumber: "",
    bloodgroup: "",
    parentname: "",
    city: "",
    maritalstatus: "",
    address: "",
  });

  const [file, setFile] = useState();
  const [branches, setBranches] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5002/initdata")
      .then((res) => {
        setBranches(res.data.branch);
        setRole(res.data.rolename);
      })
      .catch((err) => console.log("API fetch error", err));
  }, []);

  const handleFile = (e) => setFile(e.target.files[0]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = new FormData();
  for (const key in personalDetails) submitData.append(key, personalDetails[key]);
  if (file) submitData.append("profile", file);

  const facultypersonal = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const aadhaarRegex = /^\d{12}$/;

    const birthDate = new Date(personalDetails.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) return alert("You must be at least 18 years old to register.");

    if (
      emailRegex.test(personalDetails.email) &&
      mobileRegex.test(personalDetails.contactnumber) &&
      aadhaarRegex.test(personalDetails.adhaarno)
    ) {
      axios
        .post("http://localhost:5002/facultypersonal", submitData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => alert("Submission successful"))
        .catch((err) => {
          console.log("Server error", err);
          alert("Something went wrong while submitting");
        });
    } else {
      if (!emailRegex.test(personalDetails.email)) alert("Invalid email");
      else if (!mobileRegex.test(personalDetails.contactnumber)) alert("Invalid mobile number");
      else if (!aadhaarRegex.test(personalDetails.adhaarno)) alert("Invalid Aadhaar number");
    }
  };

  const myRef = useRef();

  return (
    <div className="p-4">
      <div
        className="w-full max-w-5xl mx-auto mt-10 p-6 rounded-lg shadow-md"
        style={{ backgroundColor: "var(--main-bg)", color: "var(--color-fg)" }}
      >
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold">Faculty Registration</span>
        </div>

        <form
          onSubmit={facultypersonal}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Branch */}
          <div>
            <label className="text-sm font-medium">BranchName</label>
            <select
              name="branchname"
              value={personalDetails.branchname}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            >
              <option value="">--select--</option>
              {branches.map((item) => (
                <option key={item.branchname}>{item.branchname}</option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              name="role"
              value={personalDetails.role}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            >
              <option value="">--select--</option>
              {role.map((item, index) => (
                <option key={index} value={item.rolename}>
                  {item.rolename}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={personalDetails.name}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="xyz@gmail.com"
              value={personalDetails.email}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="text-sm font-medium">Aadhaar Number</label>
            <input
              type="text"
              name="adhaarno"
              placeholder="xxxxxxx7890"
              value={personalDetails.adhaarno}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-sm font-medium">Contact Number</label>
            <input
              type="tel"
              name="contactnumber"
              placeholder="enter your mobile number"
              value={personalDetails.contactnumber}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={personalDetails.gender}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            >
              <option value="">-- Select Gender --</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={personalDetails.dob}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Date of Joining */}
          <div>
            <label className="text-sm font-medium">Date of Joining</label>
            <input
              type="date"
              name="doj"
              value={personalDetails.doj}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-sm font-medium">Blood Group</label>
            <select
              name="bloodgroup"
              value={personalDetails.bloodgroup}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            >
              <option value="">--select--</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O-">O-</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Parent Name */}
          <div>
            <label className="text-sm font-medium">Parent Name</label>
            <input
              type="text"
              name="parentname"
              placeholder="enter your parentname"
              value={personalDetails.parentname}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              placeholder="enter your city"
              value={personalDetails.city}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-sm font-medium">Marital Status</label>
            <select
              name="maritalstatus"
              value={personalDetails.maritalstatus}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            >
              <option value="">-- Select --</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <textarea
              name="address"
              rows="3"
              placeholder="address"
              value={personalDetails.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md shadow-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                border: "1px solid var(--sidebar-bg)",
              }}
            />
          </div>

          {/* Profile Upload */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Profile Photo</label>
            <input
              type="file"
              name="profile"
              onChange={handleFile}
              required
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
             className="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
