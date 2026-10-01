function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card">
      {note.title && <h3 className="note-card__title">{note.title}</h3>}
      <p className="note-card__body">{note.content}</p>
      <div className="note-card__footer">
        <span className="note-card__date">{formatDate(note.createdAt)}</span>
        <div className="note-card__actions">
          <button className="icon-btn" onClick={() => onEdit(note)} aria-label="Edit note">
            Edit
          </button>
          <button className="icon-btn icon-btn--danger" onClick={() => onDelete(note._id)} aria-label="Delete note">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
