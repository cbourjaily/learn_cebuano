import { useState } from "react";

export default function AddEntryForm({ onAdd }) {
  const [english, setEnglish] = useState("");
  const [cebuano, setCebuano] = useState("");

  const handleSubmit = async () => {
    if (!english || !cebuano) {
      alert("Fill both fields");
      return;
    }
    await onAdd({ english, cebuano });
    setEnglish("");
    setCebuano("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Add Entry</h2>
      <input
        placeholder="English"
        value={english}
        onChange={e => setEnglish(e.target.value)}
      />
      <input
        placeholder="Cebuano"
        value={cebuano}
        onChange={e => setCebuano(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}