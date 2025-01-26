import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [chapters, setChapters] = useState([]);

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Welcome to Bhagavad Gita
      </h1>
      
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;