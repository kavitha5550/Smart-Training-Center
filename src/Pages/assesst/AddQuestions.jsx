import React, { useState } from "react";
import axios from "axios";
import { PlusCircle, Trash2 } from "lucide-react";

const AddQuestions = () => {
  const [questionType, setQuestionType] = useState("");
  const [questions, setQuestions] = useState([]);

  // Add new question
  const addQuestion = () => {
    if (questionType === "MCQ") {
      setQuestions([
        ...questions,
        { type: "MCQ", question: "", options: ["", "", "", ""], answer: "" },
      ]);
    } else if (questionType === "Theory") {
      setQuestions([...questions, { type: "Theory", question: "", answer: "" }]);
    }
  };

  // Handle change
  const handleChange = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((ele,i) => i !== index));
  };

  // Save to backend
  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5002/add-questions", questions);
      alert(res.data.message);
      setQuestions([]); // clear after save
    } catch (err) {
      console.error('server err',err);
      alert("Error saving questions");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <label className="block font-semibold text-lg mb-2">
        Choose Question Type:
      </label>
      <select
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
        className="border p-3 rounded-xl w-full bg-gray-50 shadow-sm"
      >
        <option value="">--Select--</option>
        <option value="MCQ">MCQ</option>
        <option value="Theory">Theory</option>
      </select>

      <button
        onClick={addQuestion}
        // disabled={!questionType}
        className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl shadow-lg disabled:bg-gray-400"
      >
        <PlusCircle size={20} />
        Add {questionType} Question
      </button>

      {/* Render Questions */}
      <div className="mt-6 space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white border rounded-2xl shadow-md p-5 relative">
            <button
              type="button"
              onClick={() => deleteQuestion(qIndex)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>

            <label className="font-medium">
              {q.type} Question {qIndex + 1}
            </label>
            <input
              type="text"
              placeholder="Enter Question"
              value={q.question}
              onChange={(e) => handleChange(qIndex, "question", e.target.value)}
              className="w-full border p-3 rounded-xl mt-2 bg-gray-50"
            />

            {q.type === "MCQ" && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(qIndex, optIndex, e.target.value)
                      }
                      className="border p-3 rounded-xl bg-gray-50"
                    />
                  ))}
                </div>

                <label className="block font-medium mt-4">Correct Answer</label>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) => handleChange(qIndex, "answer", e.target.value)}
                  className="w-full border p-3 rounded-xl mt-2 bg-gray-50"
                />
              </>
            )}

            {q.type === "Theory" && (
              <>
                <label className="block font-medium mt-4">Answer</label>
                <textarea
                  placeholder="Enter Answer"
                  value={q.answer}
                  onChange={(e) => handleChange(qIndex, "answer", e.target.value)}
                  className="w-full border p-3 rounded-xl mt-2 bg-gray-50"
                  rows="4"
                />
              </>
            )}
          </div>
        ))}
      </div>

      {questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg"
        >
          Save All Questions
        </button>
      )}
    </div>
  );
};

export default AddQuestions;

