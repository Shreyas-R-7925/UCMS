import React, { useState } from 'react';

const Query = () => {
  const queryOptions = [
    'What are the URL of Insta IDs for Each Club ??',
    'Who is The Faculty Incharge Of CodeChefECC and What is their Contact Number ??',
    'Who are the students In Multiple Clubs ??',
    'List All The Presidents of the Club..',
    'List Students Who Are Members of the Most Clubs..',
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-mono font-bold text-purple-400 text-5xl mb-[2%]">Queries</h1>

      <div>
        {queryOptions.map((query, index) => (
          <div key={index} className="mt-4">
            <label className="block text-white font-medium font-sans text-xl">
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
          className="float-right mt-3 font-mono bg-cyan-400 text-black px-4 py-2 font-bold text-xl rounded-md"
        >
          Execute
        </button>
          

        {queryResult && (
        <div className="mt-[12%] text-white text-xl">
          <h2 className='font-mono font-bold text-3xl text-green-400'>Query Result:</h2>
          <pre>
            {Object.keys(queryResult).map((key) => (
              <div key={key}>
                {key}: {JSON.stringify(queryResult[key], null, 2)}
              </div>
            ))}
          </pre>
        </div>
      )}
        
        
      </div>
    </div>
  );
};

export default Query;
