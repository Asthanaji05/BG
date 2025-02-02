import React, { useState } from "react";
import { FaPlay, FaDownload } from "react-icons/fa";  // Speaker icon and download icon

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const handleGenerateAudio = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to generate audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePlayAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <h2>Text-to-Speech Generator</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here..." />
      <button onClick={handleGenerateAudio}>Generate Audio</button>

      {audioUrl && (
        <div>
          {/* Play Button with speaker icon */}
          <button onClick={handlePlayAudio}>
            <FaPlay /> Play
          </button>

          {/* Download Button */}
          <a href={audioUrl} download="generated_audio.mp3">
            <button>
              <FaDownload /> Download
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
