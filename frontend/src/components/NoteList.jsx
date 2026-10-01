import NoteCard from "./NoteCard.jsx";

export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Write your first one above.</p>
      </div>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
