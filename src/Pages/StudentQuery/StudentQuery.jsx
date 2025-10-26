import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentQuery = () => {
  const [studentquery, setStudentQuery] = useState([]);
  const [activeAnswerId, setActiveAnswerId] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .post("http://localhost:5002/studentquery")
      .then((res) => {
        setStudentQuery(res.data.data);
      })
      .catch((err) => {
        console.log("server error", err);
      });
  }, []);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const handleAnswerToggle = (id) => {
    setActiveAnswerId(activeAnswerId === id ? "" : id);
  };

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmitAnswer = (id) => {
    axios
      .post("http://localhost:5002/ansquery", {
        id: id,
        date: formattedDate,
        getans: answers[id] || "",
      })
      .then((res) => {
        console.log(res.data.message);
        setActiveAnswerId(null);
      })
      .catch((err) => {
        console.log("server err", err);
      });
  };

  return (
    <div className="p-6">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--color-fg)" }}
      >
        Student Queries
      </h2>

      <div className="space-y-4">
        {studentquery.map((s) => (
          <div
            key={s.id}
            className="px-3 py-3 rounded-xl shadow-md transition duration-300 ease-in-out"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              border: "1px solid var(--sidebar-bg)",
            }}
          >
            <p>Question Id: {s.id}</p>
            <p style={{ color: "var(--sidebar-hover)" }}>
              Batch Code: {s.batchcode}
            </p>
            <p>Reg ID: {s.reg_id}</p>
            <p>
              Query Date: {new Date(s.querydate).toISOString().split("T")[0]}
            </p>
            <p
              onClick={() => handleAnswerToggle(s.id)}
              className="cursor-pointer"
            >
              Question: {s.student_query}
            </p>

            {activeAnswerId === s.id && (
              <div
                className="w-full px-2 py-2 mt-2 rounded-md"
                style={{
                  backgroundColor: "var(--main-bg)",
                  color: "var(--color-fg)",
                }}
              >
                <textarea
                  rows={1}
                  className="w-full px-2 py-2 outline-none resize-none overflow-hidden rounded-md"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-fg)",
                  }}
                  value={answers[s.id] || ""}
                  onChange={(e) => handleAnswerChange(s.id, e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  placeholder="Type your answer"
                />
                <div className="flex justify-end items-center px-2 py-2 gap-2">
                  <label>Date: {formattedDate}</label>
                  <button
                    onClick={() => handleSubmitAnswer(s.id)}
                    className="rounded-md px-2 py-2 transition"
                    style={{
                      backgroundColor: "var(--sidebar-hover)",
                      color: "#fff",
                    }}
                  >
                    Answer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentQuery;
