import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
function Home() {
  const [chapters, setChapters] = useState([]);
  const { darkMode, toggleDarkMode } = useTheme();
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          "https://vedicscriptures.github.io/chapters"
        );
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 backdrop-blur-lg sticky top-0">
      <div className="sticky top-0 backdrop-blur-lg flex-row justify-around flex">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Welcome to Bhagavad Gita
        </h1>
        <button onClick={toggleDarkMode} className="rounded-md mb-8">
          {darkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-600" />
          )}
        </button>
      </div>


      <div className="mb-8 text-center">
        <Link
          to="/chapter/1"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start Reading
        </Link>
      </div>
      

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.chapter_number}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">
              Chapter {chapter.chapter_number}: {chapter.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {chapter.translation}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {chapter.verses_count} verses
            </div>
            <Link
            to={`/chapter/${chapter.chapter_number}`}
            className="mt-auto px-4 py-0 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors text-center"
          >
            Read
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
