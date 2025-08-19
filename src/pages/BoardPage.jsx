// pages/BoardPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function BoardPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const found = allBoards.find(
      (b) => b.id === id && b.owner === currentUser.email
    );
    setBoard(found || null);
  }, [id, currentUser.email]);

  if (!board) return <div className="container"><p>Board not found.</p></div>;

  return (
    <div className="container">
      <h2>{board.title}</h2>
      {/* board content here */}
    </div>
  );
}
