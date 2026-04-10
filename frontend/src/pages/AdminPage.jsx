import AddEntryForm from "../../components/AddEntryForm";

export default function AdminPage() {
  const addEntry = async ({ english, cebuano }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ english, cebuano, audioUrl: "", videoUrl: "" }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      alert("Entry added!");
    } else {
      alert(data.error || "Failed to add entry");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Admin Panel</h2>
      <AddEntryForm onAdd={addEntry} />
    </div>
  );
}