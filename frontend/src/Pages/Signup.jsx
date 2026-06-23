import { useState } from "react";
import Navbar from "../components/Navbar"; 
import API from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", formData);

      localStorage.setItem("token", res.data.token);

      alert("Signup Successful");
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  <Navbar />
  return (
      
    <div>
      <div className="container" style={{ position:"relative" ,left:"565px" , top:"103px" }}>

      <h1>Signup</h1>
      </div>
      <div className="auth-container">
  <div className="auth-card">
    <h1>Create Account 🚀</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button type="submit">
        Signup
      </button>
    </form>
  </div>
</div>

      
    </div>
  );
}

export default Signup;