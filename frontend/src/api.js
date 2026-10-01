import axios from "axios";

const api = axios.create({
  baseURL: "/api/notes",
});

export const fetchNotes = () => api.get("/").then((res) => res.data);
export const createNote = (note) => api.post("/", note).then((res) => res.data);
export const updateNote = (id, note) => api.put(`/${id}`, note).then((res) => res.data);
export const deleteNote = (id) => api.delete(`/${id}`).then((res) => res.data);
