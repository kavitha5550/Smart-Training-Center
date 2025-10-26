import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Folder,
  UserCircle,
  QrCode,
  Binary,
  Sigma,
  Palette,
  FlaskConical,
} from "lucide-react";

// Topic names and their icons
const courses = ["Data Type", "Theorem", "Figma", "Polymerization"];
const topicIcons = {
  "Data Type": <Binary size={18} style={{ color: "var(--sidebar-hover)" }} />,
  Theorem: <Sigma size={18} style={{ color: "var(--sidebar-hover)" }} />,
  Figma: <Palette size={18} style={{ color: "var(--sidebar-hover)" }} />,
  Polymerization: (
    <FlaskConical size={18} style={{ color: "var(--sidebar-hover)" }} />
  ),
};

// --------------------- NotesShare ---------------------
const NotesShare = () => {
  const [factid, setFactId] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setFactId(decode.factid);
    }
  }, []);

  useEffect(() => {
    if (factid) {
      axios
        .post("http://localhost:5002/noteshare", { factid })
        .then((res) => setNotes(res.data.data))
        .catch((err) => console.log("Server error:", err));
    }
  }, [factid]);

  return (
    <div
      className="grid gap-6"
      style={{
        backgroundColor: "var(--main-bg)",
        color: "var(--main-text)",
      }}
    >
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

// --------------------- NoteCard ---------------------
const NoteCard = ({ note }) => {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");

  const handleUpload = async () => {
    if (!file || !topic) {
      alert("Please select a topic and file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("batchcode", note.batchcode);
    formData.append("topic", topic);
    formData.append("noteId", note.id);

    try {
      const res = await axios.post("http://localhost:5002/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ File uploaded successfully!");
      console.log("Server Response:", res.data);
      setFile(null);
      setTopic("");
    } catch (err) {
      console.log("Upload error:", err);
      alert("❌ Upload failed. Please try again!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 6px 16px rgba(0,0,0,0.15)",
      }}
      className="rounded-xl p-5 flex flex-col justify-between"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-fg)",
        border: "1px solid var(--sidebar-bg)",
      }}
    >
      {/* Course Name */}
      <div className="flex items-center gap-2 mb-3">
        <BookOpenCheck size={20} style={{ color: "var(--sidebar-hover)" }} />
        <span className="font-semibold text-lg">{note.course}</span>
      </div>

      {/* Topic selector */}
      <div className="flex items-center gap-2 mb-3">
        {topicIcons[topic] || (
          <FlaskConical size={18} style={{ color: "var(--sidebar-text)" }} />
        )}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-md px-2 py-1 w-full focus:outline-none"
          style={{
            backgroundColor: "var(--main-bg)",
            color: "var(--color-fg)",
            border: "1px solid var(--sidebar-bg)",
          }}
        >
          <option value="">-- Select Topic --</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* File input */}
      <div className="flex items-center gap-2 mb-3">
        <Folder size={20} style={{ color: "var(--sidebar-hover)" }} />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm"
          style={{ color: "var(--color-fg)" }}
        />
      </div>

      {/* Batch Code */}
      <div className="flex items-center gap-2 mb-2">
        <QrCode size={18} style={{ color: "var(--sidebar-hover)" }} />
        <span
          className="font-medium"
          style={{ color: "var(--sidebar-hover)" }}
        >
          {note.batchcode}
        </span>
      </div>

      {/* Reg Id */}
      <div className="flex items-center gap-2 mb-3">
        <UserCircle size={18} style={{ color: "var(--sidebar-hover)" }} />
        <span>{note.regid}</span>
      </div>

      {/* Upload button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          className="button"
          
      
         
        >
          Upload
        </button>
      </div>
    </motion.div>
  );
};

export default NotesShare;

