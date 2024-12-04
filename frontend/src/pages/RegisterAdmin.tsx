import React, { useState } from 'react';
import { UserRegistrationData } from "../types/types.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth.ts";
import {AUTH_ENDPOINTS} from "../types/endpoints.ts";

const RegisterAdmin = () => {
  const { isLoggedIn, role } = useAuth();
  const [formData, setFormData] = useState<UserRegistrationData>({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "ROLE_USER",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting to register with:", formData);
      const response = await fetch(AUTH_ENDPOINTS.CREATE_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("User created successfully");
        console.log("User created successfully");
        navigate("/");
      } else {
        setMessage("Registration failed");
        console.log("Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      {isLoggedIn && role === "ROLE_ADMIN" ? (
        <div className="p-6">
          <h2 className="text-xl mb-4">Register User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "username", "password"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field as keyof UserRegistrationData]}
                onChange={handleChange}
                type={field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 w-full"
              />
            ))}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
            <button type="submit" className="bg-cblue text-white px-4 py-2 rounded hover:bg-cbluehover">
              Register
            </button>
          </form>
          {message && <p className="mt-4">{message}</p>}
        </div>
      ) : (
        <p>You are not authorized to view this page</p>
      )}
    </>
  );
};

export default RegisterAdmin;
