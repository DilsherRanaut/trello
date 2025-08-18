import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onCreateBoard }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

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
            <div className="inner-nav" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}>
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/home")}>
        Trello Lite
      </h2>

      <div style={{ display: "inline-flex", gap: "5px", marginRight: "15px" }}>
        {showForm ? (
          <form onSubmit={handleCreateBoard} style={{ display: "inline-flex", gap: "5px" }}>
            <input
              type="text"
              placeholder="Board name"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              required
              className="board-input"
            />
            <button className="add-board" type="submit">Add</button>
            <button className="cancel-board" type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)}>
            + Create Board
          </button>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
      </div>
      </div>
    </nav>
  );
}
