import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle
  const navigate = useNavigate();

  // prepopulate fields when user loads
  useEffect(() => {
    if (currentUser) {
      setFname(currentUser.fname || "");
      setLname(currentUser.lname || "");
      setEmail(currentUser.email || "");
      setPassword(currentUser.password || "");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { fname, lname, email, password };
    updateProfile(updatedUser);
    alert("Profile updated successfully!");
    navigate("/");
  };

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-page-outter">
        <div className="container">
          <div className="profile-page-inner">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                required
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              
              {/* Password with Eye Toggle */}
              <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: "30px" }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "44%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {showPassword ? <img src='/hidden.png' width={16}/> : <img src='/eye.png' width={16}/>}
                </span>
              </div>

              <br />
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
