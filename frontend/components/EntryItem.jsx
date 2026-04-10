import { useState } from "react";

export default function EntryItem({ entry }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ marginBottom: 8 }}>
      <button onClick={() => setShow(prev => !prev)}>
        {entry.english}
      </button>
      {show && <span style={{ marginLeft: 10 }}>{entry.cebuano}</span>}
    </div>
  );
}