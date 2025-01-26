import React from 'react';

const RightPage = ({ commentary }) => {
  return (
    <div className="page">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="prose dark:prose-invert max-w-none">
          <h3 className="text-xl font-bold mb-4">
            {commentary?.author}'s Translation & Commentary
          </h3>
          {commentary?.translation && (
            <div className="mb-4">
              <h4 className="font-bold mb-2">Translation</h4>
              <p>{commentary.translation}</p>
            </div>
          )}
          <br></br>
          {commentary?.commentary && (
            <div>
              <h4 className="font-bold mt-4 mb-2">Commentary</h4>
              <p className={commentary.language === 'sa' ? 'font-sanskrit' : ''}>
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
