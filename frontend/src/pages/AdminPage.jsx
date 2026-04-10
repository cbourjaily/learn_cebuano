import { useState } from "react";

export default function AdminPage() {
  const [english, setEnglish] = useState("");
  const [cebuano, setCebuano] = useState("");

const addEntry = async () => {
  if (!english || !cebuano) return alert("Fill both fields");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        english,
        cebuano,
        audioUrl: "",
        videoUrl: ""
      }),
    });

    const data = await res.json().catch(() => ({}));

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Entry added!");
      setEnglish("");
      setCebuano("");
    } else {
      alert(data.error || "Failed to add entry");
    }
  } catch (err) {
    console.error("NETWORK ERROR:", err);
    alert("Network error (check API URL / backend)");
  }
};

const res = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        english,
        cebuano,
        audioUrl: "",
        videoUrl: ""
      }),
    });

    if (res.ok) {
      alert("Entry added!");
      setEnglish("");
      setCebuano("");
    } else {
      alert("Failed to add entry");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Input</h2>

      <input
        placeholder="English"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Cebuano"
        value={cebuano}
        onChange={(e) => setCebuano(e.target.value)}
      />

      <br /><br />

      <button onClick={addEntry}>Add Entry</button>
    </div>
  );
}