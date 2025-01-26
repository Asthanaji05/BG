import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get('https://vedicscriptures.github.io/chapters');
        setChapters(response.data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Chapters Overview</h1>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-gray-700"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <div
            key={chapter.chapter_number}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">
                Chapter {chapter.chapter_number}
              </h2>
              <Link
                to={`/chapter/${chapter.chapter_number}`}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Read
              </Link>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-sanskrit mb-2">{chapter.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {chapter.transliteration}
              </p>
              <p className="font-medium">{chapter.translation}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold mb-2">Meaning</h4>
              <p>{chapter.meaning[selectedLanguage]}</p>
            </div>

            <div>
              <h4 className="font-bold mb-2">Summary</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {chapter.summary[selectedLanguage]}
              </p>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {chapter.verses_count} verses
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chapters;