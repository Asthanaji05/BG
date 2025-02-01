import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBook } from 'react-icons/fa';
import axios from 'axios';

function Sidebar() {
  const [chapters, setChapters] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 dark:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transform fixed lg:relative lg:translate-x-0 z-10 w-64 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-4 ">
          <h1 className="text-2xl font-bold text-primary mb-6 right-0"> Bhagavad Gita</h1>
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center py-2 px-4 rounded-md ${
                location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/chapters"
              className={`flex items-center py-2 px-4 rounded-md ${
                location.pathname === '/chapters'
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaBook className="mr-2" /> Chapters Overview
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
            {chapters.map((chapter) => (
              <Link
                key={chapter.chapter_number}
                to={`/chapter/${chapter.chapter_number}`}
                className={`block py-2 px-4 rounded-md ${
                  location.pathname.includes(`/chapter/${chapter.chapter_number}`)
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-bold">Chapter {chapter.chapter_number}</div>
                <div className="text-sm">{chapter.name}</div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
