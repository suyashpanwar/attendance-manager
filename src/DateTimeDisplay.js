import React, { useState, useEffect } from 'react';

export default function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const formattedDateTime = dateTime.toLocaleString();

  return (
    <div className='date-time'>
      {/* <h1>Current Date and Time:</h1> */}
      <p>{formattedDateTime}</p>
    </div>
  );
};

