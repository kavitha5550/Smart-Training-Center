import React, { useContext, useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FacultyContext } from "../Context/FacultyContext";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const [factId, setFactId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [sfcode, setSfcode] = useState("");
  const navigate = useNavigate();

  const { faculty, setFaculty } = useContext(FacultyContext);

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/AdminLog", {
        factId,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const decode = jwtDecode(res.data.token);
        setFaculty({
          facultyId: decode.factid,
          factname: decode.factname,
          facultyrole: decode.factrole,
        });
        setMsg(res.data.message);
        setSfcode("success");
        setTimeout(() => {
          navigate("/ADashboard");
        }, 1000);
      } else {
        console.log("no data");
      }
    } catch (err) {
      console.log(err, "server error");
      setMsg(err.response?.data?.message || "Server error ❌");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center p-2"
      style={{ backgroundColor: "var(--main-bg)", color: "var(--main-text)" }}
    >
      <div
        className="md:w-2/6 sm:w-full text-center px-5 py-5 rounded-md"
        style={{ backgroundColor: "var(--color-bg)", color: "var(--color-fg)" }}
      >
        <p className="font-pop text-lg font-bold tracking-wide mb-4">
          Sign Up
        </p>

        {/* Fact Id */}
        <div className="flex flex-col p-3">
          <label className="text-start p-2 font-pop">
            Fact Id<span className="text-red-400 p-1">*</span>
          </label>
          <div
            className="flex justify-start items-center gap-2 border-b rounded-md px-2 py-2"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              color: "var(--sidebar-text)",
            }}
          >
            <Mail className="w-5 h-5" />
            <input
              type="text"
              className="outline-none bg-transparent text-current w-full"
              placeholder="xxx"
              onChange={(e) => setFactId(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col p-3">
          <label className="text-start p-2 font-pop">
            Password<span className="text-red-400 p-1">*</span>
          </label>
          <div
            className="flex justify-start items-center gap-2 border-b rounded-md px-2 py-2"
            style={{
              backgroundColor: "var(--sidebar-bg)",
              color: "var(--sidebar-text)",
            }}
          >
            <Lock className="w-5 h-5" />
            <input
              type="password"
              className="outline-none bg-transparent text-current w-full"
              placeholder="xxxx"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <div className="flex flex-col py-2 px-2">
            <input
              type="button"
              onClick={AdminLogin}
              className="font-pop rounded-md px-2 py-2 mt-5 transition-colors duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--sidebar-hover)",
                color: "var(--hover-text)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--hover-bg)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--sidebar-hover)")
              }
              value="Login"
            />
          </div>

          <p
            className="text-center font-pop cursor-pointer px-3 py-2 mt-2"
            style={{ color: "var(--main-text)" }}
          >
            Forget password?
          </p>

          <Link to="/register">
            <span
              className="text-center font-pop px-3 py-3 mt-2 cursor-pointer"
              style={{ color: "var(--main-text)" }}
            >
              Haven’t signed up? Get started
            </span>
          </Link>
        </div>

        {/* Message */}
        {msg && (
          <p
            className="p-4 font-pop"
            style={{
              color: sfcode === "success" ? "#16a34a" : "#dc2626", // green/red
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Admin;
