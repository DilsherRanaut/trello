// pages/BoardPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import GlobalNavbar from "../components/GlobalNavbar";

export default function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [board, setBoard] = useState(null);

  // load board from localStorage
  useEffect(() => {
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const found = allBoards.find(
      (b) => b.id === id && b.owner === currentUser.email
    );
    setBoard(found || null);
    
  }, [id, currentUser.email]);

  // save board to localStorage
  const saveBoard = (updatedBoard) => {
    const allBoards = JSON.parse(localStorage.getItem("boards")) || [];
    const updatedBoards = allBoards.map((b) =>
      b.id === updatedBoard.id ? updatedBoard : b
    );
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    setBoard(updatedBoard);
  };

  // add new card
  const addCard = () => {
    const title = prompt("Enter card title:");
    if (!title) return;
    const content = prompt("Enter card content:");
    const newCard = {
      id: Date.now().toString(),
      title,
      content,
    };
    const updated = {
      ...board,
      cards: [...(board.cards || []), newCard],
    };
    saveBoard(updated);
  };

  // edit card
  const editCard = (cardId) => {
    const card = board.cards.find((c) => c.id === cardId);
    if (!card) return;

    const newTitle = prompt("Update card title:", card.title);
    if (!newTitle) return;
    const newContent = prompt("Update card content:", card.content);

    const updatedCards = board.cards.map((c) =>
      c.id === cardId ? { ...c, title: newTitle, content: newContent } : c
    );
    saveBoard({ ...board, cards: updatedCards });
  };

  // drag end
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(board.cards || []);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    saveBoard({ ...board, cards: items });
  };

  if (!board)
    return (
      <div className="container">
        <p>Board not found.</p>
      </div>
    );

  return (
    <>
      <GlobalNavbar fname={currentUser?.fname} lname={currentUser?.lname} />
      
      <div className="container">
        {/* Back button */}
        <div className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </div>

        <h2>{board.title}</h2>
        <h5>By: {board.ownername}</h5>

        <button onClick={addCard} style={{ marginBottom: "1rem" }}>
          ➕ Add Card
        </button>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board-cards"
            direction="horizontal" // horizontal dragging
          >
            {(provided) => (
              <div
                className="cards-row"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {(board.cards || []).map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDoubleClick={() => editCard(card.id)} // double click to edit
                      >
                        <h4>{card.title}</h4>
                        <p>{card.content}</p>
                        <button
                          style={{
                            marginTop: "0.5rem",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => editCard(card.id)}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
