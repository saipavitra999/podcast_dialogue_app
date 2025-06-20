import { useState } from "react";
import "./App.css";

export default function PodcastDialogueApp() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [dialog, setDialog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  // This function call the api which takes in topic and title and returns text dialogue
  const generateDialog = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-dialog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, topic }),
      });
      const data = await response.json();
      setDialog(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // This function call the built-in browser's api speechSynthesis which converts text to speech
  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // if any audio playing currently gets cancelled , so new audio can be played without overlapping
    if (currentAudio) speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setCurrentAudio(utterance);
  };

  // Setting validation to generate dialog only when title/ topic is provided
  const isFormValid = (topic !== "") | (title !== "");

  return (
    <div style={{ padding: "30px" }}>
      <h1>What would you like to listen to?</h1>
      <label style={{ padding: "10px" }}>Podcast Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <label style={{ padding: "10px" }}>Topic</label>
      <input
        style={{ marginRight: "16px" }}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />
      <button onClick={generateDialog} disabled={loading | !isFormValid}>
        {loading ? "Generating..." : "Generate Dialog"}
      </button>
      <div style={{ padding: "30px" }}>
        {dialog.map((part, idx) => (
          <div
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "16px" }}>
              <strong>{part.speaker}</strong>
              <span> : {part.text}</span>
            </div>
            <button
              style={{ margin: "16px" }}
              onClick={() => playAudio(part.text)}
            >
              Play Audio ▶️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
