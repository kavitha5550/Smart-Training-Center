import React, { useState } from "react";

const PersonalDetails = () => {
  const [experience, setExperience] = useState({
    organization: "",
    designation: "",
    doj: "",
    dor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Experience Submitted:", experience);
  };

  return (
    <div className="p-8 rounded-lg shadow-lg"
      style={{ backgroundColor: "var(--main-bg)", color: "var(--color-fg)" }}
    >
      <h2
        className="text-2xl font-bold mb-5 border-b pb-2"
        style={{ color: "var(--color-fg)" }}
      >
        Experience Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization */}
        <div>
          <label className="block mb-2 font-medium"
            style={{ color: "var(--color-fg)" }}
          >
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={experience.organization}
            onChange={handleChange}
            placeholder="Enter organization"
            className="p-4 border rounded-lg w-full"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--sidebar-hover)",
            }}
          />
        </div>

        {/* Designation */}
        <div>
          <label className="block mb-2 font-medium"
            style={{ color: "var(--color-fg)" }}
          >
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={experience.designation}
            onChange={handleChange}
            placeholder="Enter designation"
            className="p-4 border rounded-lg w-full"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--sidebar-hover)",
            }}
          />
        </div>

        {/* Date of Joining */}
        <div>
          <label className="block mb-2 font-medium"
            style={{ color: "var(--color-fg)" }}
          >
            Date of Joining
          </label>
          <input
            type="date"
            name="doj"
            value={experience.doj}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--sidebar-hover)",
            }}
          />
        </div>

        {/* Date of Resigning */}
        <div>
          <label className="block mb-2 font-medium"
            style={{ color: "var(--color-fg)" }}
          >
            Date of Resigning
          </label>
          <input
            type="date"
            name="dor"
            value={experience.dor}
            onChange={handleChange}
            className="p-4 border rounded-lg w-full"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-fg)",
              borderColor: "var(--sidebar-hover)",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 rounded-xl shadow transition"
          style={{
            backgroundColor: "var(--sidebar-hover)",
            color: "var(--color-fg)",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
