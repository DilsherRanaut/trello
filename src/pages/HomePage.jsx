import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  // Load boards for current user
  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const userBoards = storedBoards.filter((b) => b.owner === currentUser.email);
    setBoards(userBoards);
  }, [currentUser.email]);

  // Save boards when updated
  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const filtered = allBoards.filter((b) => b.owner !== currentUser.email);
    localStorage.setItem("boards", JSON.stringify([...filtered, ...boards]));
  }, [boards, currentUser.email]);

  const handleCreateBoard = (title) => {
    const newBoard = {
      id: Date.now().toString(),
      title,
      owner: currentUser.email,
    };
    setBoards([...boards, newBoard]);
  };

  const handleOpenBoard = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="home-page" >
        <Navbar onCreateBoard={handleCreateBoard} />
        <div className="container">
      {/* ✅ Navbar handles board creation + logout */}
      

      <h2>Welcome, {currentUser?.name}!</h2>
      <hr />

      <h3>Your Boards</h3>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {boards.length > 0 ? (
          boards.map((board) => (
            <BoardCard key={board.id} board={board} onOpen={handleOpenBoard} />
          ))
        ) : (
          <p>No boards yet. Create one from the Navbar!</p>
        )}
        </div>
      </div>
    </div>
  );
}
