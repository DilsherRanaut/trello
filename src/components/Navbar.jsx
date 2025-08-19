import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onCreateBoard, fname, lname }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileName = fname[0] + lname[0];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    onCreateBoard(newBoardTitle);
    setNewBoardTitle("");
    setShowForm(false);
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
        padding: "10px 20px",
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
            onClick={() => navigate("/home")}
          >
            Trello Lite
          </h2>

          <div className="menu-bar">
            {showForm ? (
              <form
                onSubmit={handleCreateBoard}
                style={{ display: "inline-flex", gap: "5px" }}
              >
                <input
                  type="text"
                  placeholder="Board name"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  required
                  className="board-input"
                />
                <button className="add-board" type="submit">
                  Add
                </button>
                <button
                  className="cancel-board"
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button onClick={() => setShowForm(true)}>+ Create Board</button>
            )}

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
