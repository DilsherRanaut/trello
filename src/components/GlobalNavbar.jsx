import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GlobalNavbar({ fname, lname }) {
 const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileName = fname[0] + lname[0];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

 

  const handleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev); // toggle
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgb(74 144 226 / 5%)",
        color: "#fff",
      }}
    >
      <div className="container">
        <div
          className="inner-nav"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{ margin: 0, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Trello Lite
          </h2>

          <div className="menu-bar">

            <span
              className="profilename"
              onClick={handleProfileMenu}
              style={{ cursor: "pointer" }}
            >
              {profileName}
            </span>

            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-item">
                  <span className="profilename">{profileName}</span>
                  {fname} {lname}
                </div>
                <hr />
                <div
                  className="profile-menu-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}
                >
                  <img src="/profile.png" alt="Profile Icon" />
                  Profile
                </div>
                <div className="profile-menu-item">
                  <img src="/help.png" alt="Help Icon" />
                  Help
                </div>
                <div
                  className="profile-menu-item"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/signout.png" alt="Sign Out Icon" />
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
