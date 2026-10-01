import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";
import { fetchNotes, createNote, updateNote, deleteNote } from "./api.js";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
      setError("");
    } catch (err) {
      setError("Couldn't load notes. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(payload) {
    try {
      if (editingNote) {
        const updated = await updateNote(editingNote._id, payload);
        setNotes((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
        setEditingNote(null);
      } else {
        const created = await createNote(payload);
        setNotes((prev) => [created, ...prev]);
      }
      setError("");
    } catch (err) {
      setError("Couldn't save that note. Try again.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (editingNote?._id === id) setEditingNote(null);
    } catch (err) {
      setError("Couldn't delete that note. Try again.");
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__logo">ShortNote</h1>
        <p className="app__tagline">Quick thoughts, 250 characters or less.</p>
      </header>

      <main className="app__main">
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
          onCancelEdit={() => setEditingNote(null)}
        />

        {error && <p className="app__error">{error}</p>}

        {loading ? (
          <p className="app__loading">Loading notes…</p>
        ) : (
          <NoteList notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
