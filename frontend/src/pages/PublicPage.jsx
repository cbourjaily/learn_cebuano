import { useEffect, useState } from "react";

export default function PublicPage() {
  const [entries, setEntries] = useState([]);
  const [openEnglish, setOpenEnglish] = useState(new Set());
  const [openCebuano, setOpenCebuano] = useState(new Set());

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/entries`)
      .then(res => res.json())
      .then(data => setEntries(data));
  }, []);

  const toggle = (setState, id) => {
    setState(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>

      <h2>English → Cebuano</h2>
      {entries.map(e => (
        <div key={e._id}>
          <button onClick={() => toggle(setOpenEnglish, e._id)}>{e.english}</button>
          {openEnglish.has(e._id) && <div>{e.cebuano}</div>}
        </div>
      ))}

      <h2>Cebuano → English</h2>
      {entries.map(e => (
        <div key={e._id}>
          <button onClick={() => toggle(setOpenCebuano, e._id)}>{e.cebuano}</button>
          {openCebuano.has(e._id) && <div>{e.english}</div>}
        </div>
      ))}

    </div>
  );
}