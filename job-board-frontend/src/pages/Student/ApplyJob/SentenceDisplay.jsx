import React, { useState } from "react";

function SentenceDisplay({ sentence = "", maxWords }) {
  //   const maxWords = 10;
  const [showMore, setShowMore] = useState(false);

  // Split the sentence into words
  const words = sentence?.split(" ");

  // Determine if the sentence is longer than 100 words
  const isLongSentence = words.length > maxWords;

  // Display only the first 100 words or the entire sentence based on showMore state
  const displaySentence = isLongSentence
    ? showMore
      ? sentence
      : words.slice(0, maxWords).join(" ")
    : sentence;

  return (
    <div>
      {displaySentence}
      {isLongSentence && (
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? " see less" : " see more"}
        </span>
      )}
    </div>
  );
}

export default SentenceDisplay;
