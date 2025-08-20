// import { FaTrash } from "react-icons/fa";

export default function BoardCard({ board, onOpen, onDelete }) {
  return (
    <div
      className="relative board-card group"
      onClick={onOpen}
    >
      <h3>{board.title}</h3>

      {/* Delete Icon - only visible on hover */}
      <img
      src="/delete.png"
        onClick={(e) => {
          e.stopPropagation(); // prevent navigation
          onDelete(board.id);
        }}
        className="delete-board"
        width={20}
      />
        
      
    </div>
  );
}
