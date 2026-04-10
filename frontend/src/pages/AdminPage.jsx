import { useEffect, useState } from "react";
import AddEntryForm from "../../components/AddEntryForm";

export default function AdminPage() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editEnglish, setEditEnglish] = useState("");
  const [editCebuano, setEditCebuano] = useState("");

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/entries`)
    .then(res => res.json())
    .then(data => setEntries(data))
    .catch(err => console.error("FETCH ERROR:", err));
}, []);

  const addEntry = async ({ english, cebuano }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ english, cebuano, audioUrl: "", videoUrl: "" }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setEntries(prev => [...prev, data]);
      alert("Entry added!");
    } else {
      alert(data.error || "Failed to add entry");
    }
  };

  const deleteEntry = async (id) => {
    if (!confirm("Delete this entry?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/entries/${id}`, {
      method: "DELETE",
    });
    setEntries(prev => prev.filter(e => e._id !== id));
  };

  const startEdit = (entry) => {
    setEditingId(entry._id);
    setEditEnglish(entry.english);
    setEditCebuano(entry.cebuano);
  };

  const saveEdit = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ english: editEnglish, cebuano: editCebuano, audioUrl: "", videoUrl: "" }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setEntries(prev => prev.map(e => e._id === id ? data : e));
      setEditingId(null);
    } else {
      alert(data.error || "Failed to update entry");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Admin Panel</h2>
      <AddEntryForm onAdd={addEntry} />

      <h3>All Entries</h3>
      {entries.map(e => (
        <div key={e._id} style={{ marginBottom: 10 }}>
          {editingId === e._id ? (
            <>
              <input value={editEnglish} onChange={ev => setEditEnglish(ev.target.value)} />
              <input value={editCebuano} onChange={ev => setEditCebuano(ev.target.value)} />
              <button onClick={() => saveEdit(e._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{e.english} → {e.cebuano}</span>
              <button onClick={() => startEdit(e)} style={{ marginLeft: 10 }}>Edit</button>
              <button onClick={() => deleteEntry(e._id)} style={{ marginLeft: 5 }}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}