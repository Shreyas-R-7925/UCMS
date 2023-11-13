import React, { useState } from 'react';

const Query = () => {
  const queryOptions = [
    'What are the URL of Insta IDs for Each Club ??',
    'Who is The Faculty Incharge Of CodeChefECC and What is their Contact Number ??',
    'Who are the students In Multiple Clubs ??',
    'List All The Presidents of the Club..',
    'Find Clubs with Members Who Belong to Multiple Departments..',
    'How many Members are in CodeChef Club??'
  ];

  const [selectedQueryIndex, setSelectedQueryIndex] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const handleRadioChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setSelectedQueryIndex(index);
  };

  const submitQuery = async () => {
    try {
      if (selectedQueryIndex !== null && selectedQueryIndex >= 0 && selectedQueryIndex < queryOptions.length) {
        console.log("Sending query index:", selectedQueryIndex);

        const response = await fetch('http://localhost:5000/api/execute-query-by-index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ queryIndex: selectedQueryIndex }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Query executed successfully:', result);

          // Set the result in state to display it on the webpage
          setQueryResult(result);
        } else {
          console.error('Error executing query:', response.statusText);
        }
      } else {
        console.error('Invalid query index');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center font-mono text-2xl">Queries Page</h1>

      <div>
        {queryOptions.map((query, index) => (
          <div key={index} className="mt-4">
            <label className="block text-gray-700 font-medium">
              <input
                type="radio"
                name="queryOption"
                value={index}
                checked={selectedQueryIndex === index}
                onChange={handleRadioChange}
              />{' '}
              {query}
            </label>
          </div>
        ))}

        <button
          onClick={submitQuery}
          className="mt-3 font-inter font-medium bg-[#ffbf00] text-black px-4 py-2 rounded-md"
        >
          Execute Selected Query
        </button>

        {queryResult && (
          <div className="mt-3">
            <h2>Query Result:</h2>
            <pre>{JSON.stringify(queryResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Query;
