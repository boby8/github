import React from 'react'
import { useState, useEffect } from "react";

const FetchData = () => {
    const [data, setData] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?`)
      .then((response) => {
        if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
      })
      .then((actualData) => {
        console.log(actualData)
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
    <h1>API Posts</h1>
    {loading && <div>A moment please...</div>}
    {error && (
      <div>{`There is a problem fetching the post data - ${error}`}</div>
    )}
    <ul>
      {data &&
        data.map(({ id, title }) => (
          <li key={id}>
            <h3>{title}</h3>
          </li>
        ))}
    </ul>
  </div>
  )
}

export default FetchData
