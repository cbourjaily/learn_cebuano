import { useState } from "react";

export default function AdminPage() {
  const [english, setEnglish] = useState("");
  const [cebuano, setCebuano] = useState("");

  const addEntry = () => {
    console.log("NEW ENTRY:", { english, cebuano });

    alert("Entry added (mock only)");

    setEnglish("");
    setCebuano("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Input</h2>

      <input
        placeholder="English"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />

      <br />

      <input
        placeholder="Cebuano"
        value={cebuano}
        onChange={(e) => setCebuano(e.target.value)}
      />

      <br />

      <button onClick={addEntry}>
        Add Entry
      </button>
    </div>
  );
}