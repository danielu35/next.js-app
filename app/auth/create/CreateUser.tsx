"use client";
import React, { useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hashedPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formData)
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      console.log("User registered successfully!");
      setFormData({
        name: "",
        email: "",
        hashedPassword: ""
      });
    } else {
      console.error("Error registering user.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control border"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control border"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hashedPassword" className="form-label">
            Password:
          </label>
          <input
            type="hashedPassword"
            className="form-control border"
            id="hashedPassword"
            name="hashedPassword"
            value={formData.hashedPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
