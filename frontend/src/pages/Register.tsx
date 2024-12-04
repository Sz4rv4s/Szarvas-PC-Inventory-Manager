import React, {useState} from 'react'
import {DecodedToken, UserRegistrationData} from "../types/types.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/UseAuth.ts";
import {jwtDecode} from "jwt-decode";

const Register = () => {
  const { setIsLoggedIn, setJwt, setUsername, setRole } = useAuth();
  const [formData, setFormData] = useState<UserRegistrationData>({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "ROLE_USER",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      console.log("Attempting to log in with:", { username });
      const response = await fetch("http://localhost:8000/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const decodedToken: DecodedToken = jwtDecode(data.jwt);
        const userRole = decodedToken.role;

        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("username", username);
        localStorage.setItem("role", userRole);
        setJwt(data.jwt);
        setUsername(username);
        setRole(userRole);
        setIsLoggedIn(true);
        setMessage("Login successful");
        console.log("Login successful");
        navigate("/");
      } else {
        setMessage("Login failed");
        console.log("Login failed");
      }
    } catch (error) {
      setMessage("An error occurred");
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Attempting to register with:", formData);
      const response = await fetch("http://localhost:8000/api/users/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("User created successfully");
        console.log("User created successfully");
        await handleLogin(formData.username, formData.password);
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
    <div className="p-6">
      <h2 className="text-xl mb-4">Register</h2>
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
        <button type="submit" className="bg-cblue text-white px-4 py-2 rounded hover:bg-cbluehover">
          Register
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
export default Register;
