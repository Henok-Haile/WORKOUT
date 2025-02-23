import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://workout-qzwy.onrender.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email); // Store email in localStorage
        window.dispatchEvent(new Event("authChanged"));

        enqueueSnackbar("Login successful!", { variant: "success" });
        
        navigate("/");
      } else {
        // console.error("🚨 Login Error:", data.message);
        // alert(data.message);
        enqueueSnackbar(data.message || "Login failed", { variant: "error" });
      }
    } catch (error) {
      // console.error("Login Error:", error);
      enqueueSnackbar("Login error: " + error.message, { variant: "error" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label> {/* Fixed label */}
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
