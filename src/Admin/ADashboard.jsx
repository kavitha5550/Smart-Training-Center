import React, { useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  User,
  UserCheck,
  CalendarCheck,
  Notebook,
  Share2,
  Moon,
  Target,
  BarChart3,
  CircleQuestionMark,
  Layers,
  ChevronDown,
  ClipboardClock,
  AlarmClock,
} from "lucide-react";
import { FaUser, FaEllipsisV, FaQuestionCircle } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import logo from "../Logo/GCIT.png";
import { FacultyContext } from "../Context/FacultyContext";
import { jwtDecode } from "jwt-decode";

const ADashboard = () => {
  const [batch, setBatch] = useState("");
  const location = useLocation();
  const { faculty, setFaculty, theme, toggle } = useContext(FacultyContext);

  const [openProfile, setOpenProfile] = useState(false);
  const [batchActive, setBatchActive] = useState(false);
  const [NotesShare, setNotesShare] = useState(false);
  const [ask, setAsk] = useState(false);
  const [Attendance, setAttendance] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setRole(decode.factrole);
    }
  }, []);

  return (
    <div style={{ backgroundColor: "var(--main-bg)", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="px-6 py-2 flex justify-between"
        style={{ backgroundColor: "var(--navbar-bg)", color: "var(--navbar-text)" }}
      >
        <div>
          <img src={logo} alt="logo" width={200} />
        </div>
        <div className="flex space-x-4 items-center text-xl">
          <FaUser title="User" />
          <Moon className="cursor-pointer" onClick={() => toggle()} />
          <FaEllipsisV title="Menu" />
          <FaQuestionCircle title="Help" />
        </div>
      </nav>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="w-64 flex flex-col p-5 space-y-4"
          style={{ backgroundColor: "var(--sidebar-bg)", color: "var(--sidebar-text)" }}
        >
          {/* Profile Section */}
          <div>
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
              style={{ backgroundColor: openProfile ? "var(--sidebar-hover)" : "transparent" }}
            >
              <div className="flex items-center gap-2">
                <User size={18} /> Profile
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${openProfile ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            {openProfile && (
              <div className="ml-6 space-y-1">
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    `flex mt-2 items-center gap-2 px-3 py-2 rounded-lg transition 
                    ${isActive ? "active-link" : "hover-link"}`
                  }
                >
                  Profile
                </NavLink>

                <NavLink
                  to="personaldetails"
                  className={({ isActive }) =>
                    `flex mt-2 items-center gap-2 px-3 py-2 rounded-lg transition 
                    ${isActive ?"active-link" : "hover-link"}`
                  }
                >
                  Personal Details
                </NavLink>
              </div>
            )}
          </div>

          {/* Role-based menus */}
          {role === "Network Admin" && (
            <div>
              <div
                onClick={() => setBatchActive(!batchActive)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: batchActive ? "var(--sidebar-hover)" : "transparent" }}
              >
                <div className="flex items-center gap-2">
                  <Layers size={18} /> Batch Management
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${batchActive ? "rotate-180" : "rotate-0"}`}
                />
              </div>

              {batchActive && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="batch"
                    className={({ isActive }) =>
                      `flex mt-2 items-center gap-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}`
                    }
                  >
                    <ClipboardClock size={18} /> Assign Batches
                  </NavLink>

                  <NavLink
                    to="addstudents"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}`
                    }
                  >
                    <PiStudent size={18} /> Modify Batches
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {role === "Faculty" && (
            <>
              {/* Schedule */}
              <div
                onClick={() => setBatchActive(!batchActive)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: batchActive ? "var(--sidebar-hover)" : "transparent" }}
              >
                <div className="flex items-center gap-2">
                  <AlarmClock size={18} /> Schedule
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${batchActive ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {batchActive && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="fbatch"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}`
                    }
                  >
                    <PiStudent size={18} /> Batches
                  </NavLink>
                </div>
              )}

              {/* Assessment */}
              <div
                onClick={() => setBatchActive(!batchActive)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: batchActive ? "var(--sidebar-hover)" : "transparent" }}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} /> Assessment
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${batchActive ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {batchActive && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="questions"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}`
                    }
                  >
                    <Target size={18} /> Questions
                  </NavLink>
                </div>
              )}

              {/* Notes Share */}
              <div
                onClick={() => setNotesShare(!NotesShare)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: NotesShare ? "var(--sidebar-hover)" : "transparent" }}
              >
                <div className="flex items-center gap-2">
                  <Notebook size={18} /> Notes Share
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${NotesShare ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {NotesShare && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="notesshare"
                    className={({ isActive }) =>
                      `flex mt-2 items-center gap-2 px-3 py-2 rounded-lg transition 
                      ${isActive ?"active-link" : "hover-link"}`
                    }
                  >
                    <Share2 size={18} /> Notes
                  </NavLink>
                </div>
              )}

              {/* Ask Me */}
              <div
                onClick={() => setAsk(!ask)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: ask ? "active-link" : "hover-link" }}
              >
                <div className="flex items-center gap-2">
                  <CircleQuestionMark size={18} /> Ask me
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${ask ? "rotate-180" : "rotate-0"}`}
                />
              </div>
              {ask && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="studentquery"
                    className={({ isActive }) =>
                      `flex items-center gap-2 mt-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}}`
                    }
                  >
                    <PiStudent size={18} /> Student Query
                  </NavLink>
                </div>
              )}
{/* {/* 
              // {/* Attendance */}
              {/* <div
                onClick={() => setAttendance(!Attendance)}
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg transition"
                style={{ backgroundColor: Attendance ? "active-link" : "hover-link" }}
              >
                <div className="flex items-center gap-2">
                  <UserCheck size={18} /> Attendance
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${Attendance ? "rotate-180" : "rotate-0"}`}
                />
              </div> */}
              {/* {Attendance && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="mark"
                    className={({ isActive }) =>
                      `flex items-center gap-2 mt-2 px-3 py-2 rounded-lg transition 
                      ${isActive ? "active-link" : "hover-link"}`
                    }
                  >
                    <UserCheck size={18} /> Attendance
                  </NavLink>
                </div>
              )} */}
            </>
          )}  

          {/* Common Links */}
          <NavLink
            to="register"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition 
              ${isActive ?"active-link" : "hover-link"}`
            }
          >
            <FaUser size={18} /> Faculty Register
          </NavLink>

          <NavLink
  to="password"
  className={({ isActive }) => `
    flex items-center gap-2 px-3 py-2 rounded-lg transition
    ${isActive ? "active-link" : "hover-link"}
  `}
>
  <CalendarCheck size={18} /> Update
</NavLink>

        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ADashboard;
