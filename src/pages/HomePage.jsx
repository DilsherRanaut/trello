import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BoardCard from "../components/BoardCard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  // ✅ Load boards from localStorage when page loads
  useEffect(() => {
    if (!currentUser?.email) return;

    const storedBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const userBoards = storedBoards.filter(
      (b) => b.owner === currentUser.email
    );

    setBoards(userBoards);
  }, [currentUser?.email]);

  // ✅ Create new board (and save to localStorage immediately)
  const handleCreateBoard = (title) => {
    const newBoard = {
      id: Date.now().toString(),
      title,
      owner: currentUser.email,
      cards: [],
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);

    // save directly
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const filtered = allBoards.filter((b) => b.owner !== currentUser.email);
    localStorage.setItem(
      "boards",
      JSON.stringify([...filtered, ...updatedBoards])
    );
  };

  // ✅ Save boards only when they’re non-empty and currentUser exists
  useEffect(() => {
    if (!currentUser?.email) return;
    if (boards.length === 0) return; // prevent overwriting with empty array

    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const filtered = allBoards.filter((b) => b.owner !== currentUser.email);

    localStorage.setItem("boards", JSON.stringify([...filtered, ...boards]));
  }, [boards, currentUser?.email]);

  // ✅ Open board by navigating with ID
  const handleOpenBoard = (id) => {
    navigate(`/board/${id}`);
  };

  // ✅ Delete a board
  const handleDeleteBoard = (id) => {
    const updatedBoards = boards.filter((b) => b.id !== id);
    setBoards(updatedBoards);

    // update localStorage
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const filtered = allBoards.filter((b) => b.owner !== currentUser.email);
    localStorage.setItem(
      "boards",
      JSON.stringify([...filtered, ...updatedBoards])
    );
  };

  return (
    <div className="home-page">
      <Navbar
        onCreateBoard={handleCreateBoard}
        fname={currentUser?.fname}
        lname={currentUser?.lname}
      />

      <div className="container">
        <h2>Welcome, {currentUser?.fname}!</h2>
        <hr />

        <h3>Your Boards</h3>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {boards.length > 0 ? (
            boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onOpen={() => handleOpenBoard(board.id)}
                onDelete={handleDeleteBoard}
              />
            ))
          ) : (
            <p>No boards yet. Create one from the Navbar!</p>
          )}
        </div>
      </div>
    </div>
  );
}
