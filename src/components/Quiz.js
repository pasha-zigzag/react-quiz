import Question from './Question';
import { useState } from 'react';

const Quiz = () => {
  return (
    <div className="quiz">
      <div>
        <div className="score">Question 1/8</div>
        <Question/>
        <div className="next-button">Next question</div>
      </div>
    </div>
  );
};

export default Quiz;