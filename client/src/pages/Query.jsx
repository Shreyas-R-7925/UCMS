import React, { useState } from 'react';

const Query = () => {
  const queryOptions = 
  [
    'List the Email IDs of All Clubs.',
    'List Students who are not part of any Club.',
    'List Faculty members associated with each club.',
    'List the presidents of each club.',
    'Who are the students In Multiple Clubs ??',
    'List the number of members belonging to each club.'
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

      <div classname = "mb-[8%]" >
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
          
  {
  queryResult && 
  (<div className="text-2xl mt-[14%] mb-[15%] text-green-300 font-mono font-bold">
    <h2> Result :</h2>
    {selectedQueryIndex === 5 ? (
      // Handle stored procedure result
      <div>
        {queryResult.result[0].map((club, index) => (
          <div key={index}>
            <strong >Club Name:</strong> {club.clubName} <br/>
            <strong >Member Count:</strong> {club.memberCount}
          </div>
        ))}
      </div>
    ) : Array.isArray(queryResult.result) ? (
      // Display regular SQL query result as a table
      <table>
        {/* Display table headers */}
        <thead>
          <tr>
            {Object.keys(queryResult.result[0]).map((key) => (
              <th classname = "text-white" key={key}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        {/* Display table rows */}
        <tbody classname = "mt-[2%]">
          {queryResult.result.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'}>
              {Object.values(item).map((value, index) => (
                <td key={index} className="text-lg text-black">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      // Display non-dictionary JSON content
      <pre>{JSON.stringify(queryResult.result, null, 2)}</pre>
    )}
  </div>
)}
        
        
        
      </div>
    </div>
  );
};

export default Query;
