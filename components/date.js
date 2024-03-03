import React from 'react';

function CurrentDate() {
  const now = new Date();
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', options) + getOrdinal(now.getDate());

  function getOrdinal(day) {
    if (day > 3 && day < 21) return 'th'; // for dates like 4th, 5th, ... 20th, 21st
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  return <div>{formattedDate} Anatomy Crossword</div>;
}

export default CurrentDate;
