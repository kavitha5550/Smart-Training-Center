import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, ChevronDown, ChevronUp, UserCircle } from "lucide-react";

const Fbatch = () => {
  const [factid, setFactId] = useState("");
  const [batches, setBatches] = useState([]);
  const [openBatch, setOpenBatch] = useState(null); // track which batch is open
  const [students, setStudents] = useState({}); // store students per batch

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

  const toggleBatch = (batchcode) => {
    if (openBatch === batchcode) {
      setOpenBatch(null); // close if already open
    } else {
      setOpenBatch(batchcode);
      // fetch students if not already loaded
      if (!students[batchcode]) {
        axios
          .post("http://localhost:5002/studentlists", { batchcode })
          .then((res) => {
            setStudents((prev) => ({
              ...prev,
              [batchcode]: res.data.data || [],
            }));
          })
          .catch((err) => {
            console.error("Error fetching students:", err);
          });
      }
    }
  };

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={26} className="text-indigo-700" />
        <h2 className="font-semibold text-2xl text-gray-800">
          Upcoming Batches
        </h2>
      </div>

      {/* Batch Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-800 text-white text-sm uppercase tracking-wide">
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
              <React.Fragment key={s.id}>
                {/* Batch Row */}
                <tr
                  className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => toggleBatch(s.batchcode)}
                >
                  <td className="px-6 py-3 border-t">{index + 1}</td>
                  <td className="px-6 py-3 border-t font-semibold text-indigo-700 flex items-center gap-2">
                    {s.batchcode}
                    {openBatch === s.batchcode ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </td>
                  <td className="px-6 py-3 border-t text-gray-700">
                    {s.studentcount}
                  </td>
                  <td className="px-6 py-3 border-t text-gray-700">
                    {s.course}
                  </td>
                  <td className="px-6 py-3 border-t text-gray-700">
                    {s.timeslot}
                  </td>
                  <td className="px-6 py-3 border-t text-gray-700">
                    {s.dayorder}
                  </td>
                </tr>

                {/* Dropdown Row */}
                {openBatch === s.batchcode && (
                  <tr>
                    <td colSpan="6" className="bg-gray-50 px-6 py-4 border-t">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(students[s.batchcode] || []).map((stu, i) => (
                          <div
                            key={stu.regid || i}
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition"
                          >
                            <UserCircle className="text-indigo-600 w-8 h-8" />
                            <div>
                              <p className="font-semibold text-gray-800">
                                {stu.student_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                Reg ID: {stu.regid}
                              </p>
                            </div>
                          </div>
                        ))}
                        {students[s.batchcode] &&
                          students[s.batchcode].length === 0 && (
                            <p className="text-gray-500">No students found</p>
                          )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fbatch;

