import { useEffect, useState } from "react";
import EntryList from "../../components/EntryList";

export default function PublicPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/entries`)
      .then(res => res.json())
      .then(data => setEntries(data));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Learn Cebuano</h2>
      <EntryList entries={entries} />
    </div>
  );
}