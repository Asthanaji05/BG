import React from "react";
import { FaVolumeUp } from "react-icons/fa";

const RightPage = ({ commentary }) => {
  const handlePlay = async (text) => {
    if (!text) return;

    try {
      //const response = await fetch("https://bg-backend-ykf0.onrender.com/generate-audio", {
        const response = await fetch("https://bg-backend-ykf0.onrender.com/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to generate audio");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            {commentary?.author}'s Translation & Commentary
            <FaVolumeUp
              className="text-blue-500 cursor-pointer"
              onClick={() => handlePlay(`${commentary?.author}'s Translation & Commentary`)}
            />
          </h3>

          {commentary?.translation && (
            <div className="mb-4">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                Translation
              </h4>
              <p className="flex items-center gap-2">
                {commentary.translation}
                <FaVolumeUp
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handlePlay(commentary.translation)}
                />
              </p>
            </div>
          )}

          {commentary?.commentary && (
            <div>
              <h4 className="font-bold mt-4 mb-2 flex items-center gap-2">
                Commentary
                <FaVolumeUp
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handlePlay(commentary.commentary)}
                />
              </h4>
              <p
                className={`flex items-center gap-2 ${commentary.language === "sa" ? "font-sanskrit" : ""}`}
              >
                {commentary.commentary}

              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPage;
