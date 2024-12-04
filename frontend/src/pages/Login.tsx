import React, {useState} from 'react'
import {DecodedToken, UserLoginData} from "../types/types.ts";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {useAuth} from "../context/UseAuth.ts";
import {AUTH_ENDPOINTS} from "../types/endpoints.ts";

const Login = () => {
  const { setIsLoggedIn, setJwt, setUsername, setRole } = useAuth();
  const [formData, setFormData] = useState<UserLoginData>({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(AUTH_ENDPOINTS.AUTHENTICATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.jwt) {
        const decodedToken: DecodedToken = jwtDecode(data.jwt);
        const userRole = decodedToken.role;

        setJwt(data.jwt);
        setUsername(formData.username);
        setRole(userRole);
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("role", userRole);
        setIsLoggedIn(true);
        setMessage("Login successful");
        navigate("/");
      } else {
        console.error("Login failed");
        setMessage("Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            value={(formData)[field as keyof UserLoginData]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border p-2 w-full"
          />
        ))}
        <button type="submit" className="bg-cblue text-white px-4 py-2 rounded hover:bg-cbluehover">
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Login;
