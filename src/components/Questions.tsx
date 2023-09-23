import "../Questions.css";
import { Button } from "grommet";
import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

interface Question {
  question: string;
  image: string | null;
  answers: string[];
  correct_answer: number;
}

const Questions = () => {
  const [questionNum, setQuestionNum] = useState(0);
  const [data, setData] = useState<Question[] | null>(null);

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/e2d645bc-6ede-47f3-8a20-eeb1298418ea")
      .then((response) => setData(response.data));
  }, []);

  const currentQuestion =
    data && data.length > questionNum ? data[questionNum] : null;

  console.log(currentQuestion);

  const handleNextClick = () => {
    questionNum < 9
      ? setQuestionNum((prevQuestionNum) => prevQuestionNum + 1)
      : "Completed";
  };

  return (
    <>
      <div className="mainCard">
        <div className="progressBar">
          <CircularProgressbar
            value={(questionNum + 1) * 10}
            text={`${questionNum + 1} / 10`}
          />
        </div>
        <div className="contentCard">
          {currentQuestion && (
            <div className="questionDisplay">{currentQuestion.question}</div>
          )}

          {currentQuestion && (
            <div className="option">
              {currentQuestion.answers.map((option, index) => (
                <div key={index} className="options">
                  <input type="radio" id={`option${index}`} value={option} />
                  <label className="lbl" htmlFor={`option${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="nxtButton">
            <Button
              className="nxtBtn"
              color="#FF3B3C"
              size="large"
              label="Next"
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
