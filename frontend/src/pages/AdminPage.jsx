console.log("API URL:", import.meta.env.VITE_API_URL);

const addEntry = async () => {
  console.log("CLICKED");

  try {
    if (!english || !cebuano) {
      alert("Fill both fields");
      return;
    }

    console.log("SENDING REQUEST...");

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

    console.log("FETCH DONE");

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
    console.error("ERROR:", err);
  }
};