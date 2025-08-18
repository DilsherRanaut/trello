export default function BoardCard({ board, onOpen }) {
  return (
    <>
    <div
      className="board-card"
      onClick={() => onOpen(board.id)}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        minWidth: "150px",
        textAlign: "center",
        background: "#f8f9fa"
      }}
    >
      <h3>{board.title}</h3>
    </div>
    </>
  );
}
