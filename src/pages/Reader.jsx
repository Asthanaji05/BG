import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
// const { createAudioFileFromText, createAudioStreamFromText } = require('../test.cjs');
import RightPage from "./RightPage";
import LeftPage from "./LeftPage";
// Import the functions from test.cjs

function Reader() {
  const { chapter, verse } = useParams();
  const navigate = useNavigate();
  const [slok, setSlok] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(parseInt(verse) || 1);
  const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState("prabhu");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [verseInput, setVerseInput] = useState("");
  const { darkMode, toggleDarkMode } = useTheme();
  const [pageTurnDirection, setPageTurnDirection] = useState("right");

  const handleNextVerse = () => {
    setPageTurnDirection("right"); // Page turn right animation
    setCurrentVerse((prev) => prev + 1);
  };

  const handlePrevVerse = () => {
    if (currentVerse > 1) {
      setPageTurnDirection("left"); // Page turn left animation
      setCurrentVerse((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchSlok = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://vedicscriptures.github.io/slok/${chapter}/${currentVerse}`
        );
        setSlok(response.data);
        navigate(`/chapter/${chapter}/verse/${currentVerse}`);
      } catch (error) {
        console.error("Error fetching slok:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlok();
  }, [chapter, currentVerse]);

  const getCommentaryContent = () => {
    if (!slok || !slok[selectedAuthor]) return null;

    switch (selectedAuthor) {
      case "prabhu":
        return {
          translation: selectedLanguage === "en" ? slok.prabhu.et : null,
          commentary: selectedLanguage === "en" ? slok.prabhu.ec : null,
          author: "Swami Prabhupad",
          language: "en",
        };
      case "raman":
        return {
          translation: selectedLanguage === "en" ? slok.raman.et : null,
          commentary: selectedLanguage === "sa" ? slok.raman.sc : null,
          author: "Sri Ramanuja",
          language: selectedLanguage,
        };
      case "srid":
        return {
          translation: null,
          commentary: selectedLanguage === "sa" ? slok.srid.sc : null,
          author: "Sri Sridhara Swami",
          language: "sa",
        };
      case "vallabh":
        return {
          translation: null,
          commentary: selectedLanguage === "sa" ? slok.vallabh.sc : null,
          author: "Sri Vallabhacharya",
          language: "sa",
        };
      case "tej":
        return {
          translation: selectedLanguage === "hi" ? slok.tej.ht : null,
          commentary: null,
          author: "Swami Tejomayananda",
          language: "hi",
        };
      default:
        return null;
    }
  };

  const handleVerseNavigation = (e) => {
    e.preventDefault();
    const [chapterNum, verseNum] = verseInput
      .split(":")
      .map((num) => parseInt(num.trim()));
    if (chapterNum && verseNum) {
      navigate(`/chapter/${chapterNum}/verse/${verseNum}`);
      setCurrentVerse(verseNum);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const commentary = getCommentaryContent();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="flex gap-4">
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="px-4 py-2 rounded-md border dark:bg-gray-700"
          >
            <option value="prabhu">Swami Prabhupad</option>
            <option value="raman">Sri Ramanuja</option>
            <option value="srid">Sri Sridhara Swami</option>
            <option value="vallabh">Sri Vallabhacharya</option>
            <option value="tej">Swami Tejomayananda</option>
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 rounded-md border dark:bg-gray-700"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="sa">Sanskrit</option>
          </select>
        </div>

        <div className="flex gap-4 items-center">
          <form onSubmit={handleVerseNavigation} className="flex gap-2">
            <input
              type="text"
              placeholder="Chapter:Verse (e.g., 2:45)"
              value={verseInput}
              onChange={(e) => setVerseInput(e.target.value)}
              className="px-4 py-2 rounded-md border dark:bg-gray-700 w-48"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Go
            </button>
          </form>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevVerse}
          disabled={currentVerse <= 1}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          <FaArrowLeft className="mr-2" /> Previous Verse
        </button>
        <div className="text-center">
          <span className="font-bold">Chapter {chapter}</span>
          <span className="mx-2">|</span>
          <span>Verse {currentVerse}</span>
        </div>
        <button
          onClick={handleNextVerse}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
        >
          Next Verse <FaArrowRight className="ml-2" />
        </button>
      </div>
      <br />
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Page */}
        <LeftPage
          slok={slok}
          commentary={commentary}
          pageTurnDirection={pageTurnDirection}
        />

        {/* Right Page */}
        <RightPage slok={slok} commentary={commentary} />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevVerse}
          disabled={currentVerse <= 1}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          <FaArrowLeft className="mr-2" /> Previous Verse
        </button>
        <div className="text-center">
          <span className="font-bold">Chapter {chapter}</span>
          <span className="mx-2">|</span>
          <span>Verse {currentVerse}</span>
        </div>
        <button
          onClick={handleNextVerse}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md"
        >
          Next Verse <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default Reader;
