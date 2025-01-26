import React from 'react';

const LeftPage = ({ slok }) => {
  return (
    <div className="page">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-sanskrit mb-4">{slok?.slok}</h2>
          <p className="text-gray-600 dark:text-gray-300">{slok?.transliteration}</p>
          <p className="text-gray-800 dark:text-gray-200 mt-4">
            <strong>Swami Tejomayananda's Hindi Translation:</strong>
            <br />
            {slok.tej.ht}
          </p>
          <p className="text-gray-800 dark:text-gray-200 mt-4">
            <strong>Swami Prabhupad's English Translation:</strong>
            <br />
            {slok.prabhu.et}
          </p>
        </div>

      </div>
    </div>
  );
};

export default LeftPage;
