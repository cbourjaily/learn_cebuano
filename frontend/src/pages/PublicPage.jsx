import { useState } from "react";

const entries = [
  { id: 1, english: "Hello", cebuano: "Kumusta" },
  { id: 2, english: "How are you?", cebuano: "Kumusta ka?" },
  { id: 3, english: "Thank you", cebuano: "Salamat" },
];

export default function PublicPage() {
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [selectedCebuano, setSelectedCebuano] = useState(null);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>

      {/* ENGLISH → CEBUANO */}
      <div style={{ marginBottom: 40 }}>
        <h2>English → Cebuano</h2>

        {entries.map((e) => (
          <div key={e.id}>
            <button onClick={() => setSelectedEnglish(e)}>
              {e.english}
            </button>

            {selectedEnglish?.id === e.id && (
              <div>
                {e.cebuano}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CEBUANO → ENGLISH */}
      <div>
        <h2>Cebuano → English</h2>

        {entries.map((e) => (
          <div key={e.id}>
            <button onClick={() => setSelectedCebuano(e)}>
              {e.cebuano}
            </button>

            {selectedCebuano?.id === e.id && (
              <div>
                {e.english}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}