import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./styles/Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://workout-qzwy.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (!data.token) {
          throw new Error("No token received from server");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email); // Store email in localStorage
        window.dispatchEvent(new Event("authChanged"));

        enqueueSnackbar("Signup successful! Please log in.", { variant: "success" });
        
        navigate("/login");
      } else {
        // console.error("🚨 Signup Error:", data.message);
        // alert(data.message);
        enqueueSnackbar(data.message || "Signup failed", { variant: "error" });
      }
    } catch (error) {
      // console.error("Signup Error:", error);
      enqueueSnackbar("Signup error: " + error.message, { variant: "error" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
