import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import "./Signin.css";
import { FaGoogle } from 'react-icons/fa';  
import { FaLinkedin } from 'react-icons/fa';  

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [isResetDisabled, setIsResetDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    const handleSocialLogin = (event) => {
      if (event.origin !== "http://localhost:5000") return; 
      const { token, user } = event.data;
      if (token && user) {
        try {
          const decodedUser = JSON.parse(user); 
          console.log("Received user from LinkedIn:", decodedUser);
          if (!decodedUser._id || typeof decodedUser._id !== 'string' || !decodedUser._id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error("Invalid user ID from social login callback");
          }
          localStorage.setItem("currentUser", JSON.stringify(decodedUser));
          localStorage.setItem("jwtToken", token);
          if (decodedUser.role === "admin") {
            navigate("/admin");
          } else if (!decodedUser.hasChosenSkills) { 
            navigate("/firstchoose");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.error("Error parsing social login data:", err);
          setError("Invalid social authentication response. Please try again.");
        }
      }
    };
  
    window.addEventListener("message", handleSocialLogin);
    return () => window.removeEventListener("message", handleSocialLogin); 
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && isResetDisabled) {
      setIsResetDisabled(false);
      setResetMessage("");
    }
  }, [countdown, isResetDisabled]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", formData);

      if (response.data.userId && !response.data.token) {
        setMessage(response.data.message || "OTP sent to your email.");
        setUserId(response.data.userId);
        setOtpSent(true);
      } else if (response.data.user && response.data.token) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("jwtToken", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          const user = response.data.user;
          const hasChosenSkills = user.hasChosenSkills;
          if (hasChosenSkills === "false") {
            navigate("/firstchoose");
          } else {
            navigate("/");
          }
        }
      } else {
        setError("Sign in failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInSignIn = () => {
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
  
    const authWindow = window.open(
      "http://localhost:5000/api/users/linkedin", 
      "_blank", 
      `width=${width},height=${height},top=${top},left=${left}`
    );
  
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:5000') return;
      const { token, user } = event.data;
      if (token && user) {
        try {
          const decodedUser = JSON.parse(decodeURIComponent(user) || '{}');
          if (!decodedUser._id || typeof decodedUser._id !== 'string' || !decodedUser._id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error("Invalid user ID from LinkedIn callback");
          }
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('currentUser', user);
          navigate('/');
        } catch (err) {
          console.error("Error parsing LinkedIn callback data:", err);
          setError("Invalid LinkedIn authentication response. Please try again.");
        }
      }
    });
  
    const interval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profileResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );
        const googleId = profileResponse.data.sub;
        const email = profileResponse.data.email;
        const name = profileResponse.data.name;

        const response = await axios.post("http://localhost:5000/api/users/google/callback", {
          googleId,
          email,
          name,
        });

        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("jwtToken", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else if (!response.data.user.hasChosenSkills) {
          navigate("/firstchoose");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error with Google authentication.");
      }
    },
    onError: () => setError("Google sign-in failed."),
    scope: "profile email",
  });

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/verifyOTP", {
        email: formData.email,
        otp,
      });
      if (response.data.user && response.data.token) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("jwtToken", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          const user = response.data.user;
          const hasChosenSkills = user.hasChosenSkills;
          if (hasChosenSkills === false) {
            navigate("/firstchoose");
          } else {
            navigate("/");
          }
        }
      } else {
        setError("OTP verification failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (isResetDisabled || !formData.email) { 
      setError(!formData.email ? "Please enter your email first." : "Please wait before retrying.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/users/forgot-password", { email: formData.email });
      if (res.data.message) {
        setResetMessage("Password reset link has been sent to your email.");
        setError("");
        setIsResetDisabled(true);
        setCountdown(10);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during forgot password.");
      setResetMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-box">
        <div className="auth-container">
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          {resetMessage && <p className="reset-message">{resetMessage}</p>}
          {isResetDisabled && (
            <p className="countdown-message">You can retry in {countdown} seconds</p>
          )}
          {!otpSent ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
              <div className="forgot-password">
                <NavLink
                  to="#"
                  onClick={handleForgotPassword}
                  className={isResetDisabled ? "disabled-link" : ""}
                >
                  Forgot Password?
                </NavLink>
              </div>
              <div className="social-login">
                <p>Or connect with:</p>
                <button type="button" className="social-btn linkedin" onClick={handleLinkedInSignIn}>
                  <FaLinkedin style={{ marginRight: '8px' }} /> 
                </button>
                <button type="button" className="social-btn google" onClick={() => handleGoogleLogin()}>
                  <FaGoogle style={{ marginRight: '8px' }} /> 
                </button>
              </div>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          )}
          <div className="switch-auth">
            <p>
              Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </div>
        </div>
      </div>
      <div className="right-box">
        <div className="content">
          <h1>Welcome to SkillMinds</h1>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <GoogleOAuthProvider clientId="830930163890-i526al1nkp5f83cd5rjojtbloqkugeqg.apps.googleusercontent.com">
    <Signin />
  </GoogleOAuthProvider>
);