import React, { useState } from "react";
import { FaPlay, FaDownload, FaVolumeUp } from "react-icons/fa";

const LeftPage = ({ slok }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  // Function to fetch and play audio for any text
  const handlePlay = async (text) => {
    if (!text) return;

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

      new Audio(url).play();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to fetch and download shlok audio
  const handleDownload = async () => {
    if (!slok?.slok) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: slok.slok }),
      });

      if (!response.ok) throw new Error("Failed to generate audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "shlok_audio.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-sanskrit mb-4 flex items-center gap-2">
            {slok?.slok}
            <FaVolumeUp
              className="text-blue-500 cursor-pointer"
              onClick={() => handlePlay(slok?.slok)}
            />
          </h2>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            {slok?.transliteration}
            <FaVolumeUp
              className="text-blue-500 cursor-pointer"
              onClick={() => handlePlay(slok?.transliteration)}
            />
          </p>

          <p className="text-gray-800 dark:text-gray-200 mt-4 flex items-center gap-2">
            <strong>Swami Tejomayananda's Hindi Translation:</strong>
            <FaVolumeUp
              className="text-blue-500 cursor-pointer"
              onClick={() => handlePlay(slok.tej.ht)}
            />
            <br />
            {slok.tej.ht}
          </p>

          <p className="text-gray-800 dark:text-gray-200 mt-4 flex items-center gap-2">
            <strong>Swami Prabhupad's English Translation:</strong>
            <FaVolumeUp
              className="text-blue-500 cursor-pointer"
              onClick={() => handlePlay(slok.prabhu.et)}
            />
            <br />
            {slok.prabhu.et}
          </p>
        </div>

        {/* Play & Download Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handlePlay(slok?.slok)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            <FaPlay /> Play
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            <FaDownload /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftPage;
