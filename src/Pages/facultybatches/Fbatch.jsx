import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
 // has your theme vars

const Fbatch = () => {
  const [factid, setFactId] = useState("");
  const [batches, setBatches] = useState([]);
  const [openBatch, setOpenBatch] = useState(null);
  const [students, setStudents] = useState({});
  const [cDate, setcDate] = useState();
  const [selectedDate, setSelectedDate] = useState();

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

  const fetchStudents = async (batchcode) => {
    if (students[batchcode]) {
      setOpenBatch(openBatch === batchcode ? null : batchcode);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5002/studentlists", {
        batchcode,
      });
      setStudents((prev) => ({
        ...prev,
        [batchcode]: res.data.data || [],
      }));
      setOpenBatch(batchcode);
    } catch (err) {
      console.error("student fetch error", err);
    }
  };

  const markAttendance = async (batchId, regId, status) => {
    try {
      await axios.post("http://localhost:5002/attendance", {
        date: selectedDate,
        factid,
        batchId,
        regId,
        status,
      });
    } catch (err) {
      console.error("attendance error", err);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    setcDate(formatted);
    setSelectedDate(formatted);
  }, []);

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const getMinDate = () => {
    if (!selectedDate) return "";
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={18} style={{ color: "var(----color-fg)" }} />
        <h2
          className="font-semibold text-2xl"
          style={{ color: "var(--color-fg)" }}
        >
          Upcoming Batches
        </h2>
      </div>

      {/* Batch Table */}
      <div
        className="overflow-x-auto rounded-2xl mt-1 shadow-lg"
        style={{ backgroundColor: "var(--main-bg)", border: "1px solid var(--color-fg)" }}
      >
        <table className="min-w-full text-sm text-left">
          <thead
            style={{
              backgroundColor: "var(--sidebar-bg)",
              color: "var(--sidebar-text)",
            }}
            className="text-sm uppercase tracking-wide"
          >
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Batch Code</th>
              <th className="px-6 py-3">Students</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Timing</th>
              <th className="px-6 py-3">Day Order</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((s, index) => (
              <React.Fragment key={s.batchcode}>
                {/* Batch Row */}
                <tr
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-fg)",
                  }}
                  className="hover:[background:var(--sidebar-hover)] transition-colors duration-200 cursor-pointer"
                  onClick={() => fetchStudents(s.batchcode)}
                >
                  <td className="px-6 py-3 border-t border-[var(--color-fg)]">
                    {index + 1}
                  </td>
                <td
  className="px-6 py-3 border-t font-semibold"
  style={{ color: "var(--color-fg)" }}
>
  {s.batchcode}
</td>
                  <td className="px-6 py-3 border-t">{s.studentcount}</td>
                  <td className="px-6 py-3 border-t">{s.course}</td>
                  <td className="px-6 py-3 border-t">{s.timeslot}</td>
                  <td className="px-6 py-3 border-t">{s.dayorder}</td>
                </tr>

                {/* Expandable Student List */}
                <AnimatePresence>
                  {openBatch === s.batchcode && (
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ backgroundColor: "var(--main-bg)" }}
                    >
                      <td colSpan="6" className="px-6 py-4 border-t border-[var(--color-fg)]">
                        <div className="overflow-hidden">
                          <table className="w-full text-sm rounded-lg">
                            <thead
                              style={{
                                backgroundColor: "var(--sidebar-hover)",
                                color: "var(--color-fg)",
                              }}
                            >
                              <tr>
                                <th className="px-4 py-2">S.No</th>
                                <th className="px-4 py-2">Student Name</th>
                                <th className="px-4 py-2">Reg ID</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Attendance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(students[s.batchcode] || []).map((stu, i) => (
                                <tr
                                  key={stu.regid || i}
                                  style={{
                                    backgroundColor:
                                      i % 2 === 0
                                        ? "var(--color-bg)"
                                        : "var(--main-bg)",
                                    color: "var(--color-fg)",
                                  }}
                                >
                                  <td className="px-4 py-2">{i + 1}</td>
                                  <td className="px-4 py-2">
                                    {stu.student_name}
                                  </td>
                                  <td className="px-4 py-2">{stu.regid}</td>
                                  <td>
                                    <input
                                      type="date"
                                      value={selectedDate}
                                      min={getMinDate()}
                                      max={cDate}
                                      onChange={handleDateChange}
                                      style={{
                                        backgroundColor: "var(--color-bg)",
                                        color: "var(--color-fg)",
                                        border: "1px solid var(--color-fg)",
                                        borderRadius: "6px",
                                        padding: "2px 6px",
                                      }}
                                    />
                                  </td>
                                  <td className="flex gap-2">
                                    <button
                                      style={{
                                        backgroundColor: "var(--sidebar-hover)",
                                        color: "var(--color-fg)",
                                      }}
                                      className="px-3 py-1 mt-2 rounded-md hover:opacity-80"
                                      onClick={() =>
                                        markAttendance(
                                          s.batchcode,
                                          stu.regid,
                                          "Present"
                                        )
                                      }
                                    >
                                      Present
                                    </button>
                                    <button
                                      style={{
                                        backgroundColor: "crimson",
                                        color: "#fff",
                                      }}
                                      className="px-3 py-1  rounded-md hover:opacity-80"
                                      onClick={() =>
                                        markAttendance(
                                          s.batchcode,
                                          stu.regid,
                                          "Absent"
                                        )
                                      }
                                    >
                                      Absent
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fbatch;











