import { useEffect, useState } from "react";

const MAX_LENGTH = 250;

export default function NoteForm({ onSave, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const remaining = MAX_LENGTH - content.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="note-form__title"
        type="text"
        placeholder="Give it a name (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={60}
      />
      <textarea
        className="note-form__body"
        placeholder="Write a short note..."
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
        rows={4}
        required
      />
      <div className="note-form__footer">
        <span className={`note-form__counter ${remaining <= 20 ? "note-form__counter--low" : ""}`}>
          {remaining} left
        </span>
        <div className="note-form__actions">
          {editingNote && (
            <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn--primary">
            {editingNote ? "Save changes" : "Add note"}
          </button>
        </div>
      </div>
    </form>
  );
}
