import "../Questions.css";
import { Button, RadioButtonGroup } from "grommet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

// Define the structure of a question
interface Question {
  question: string;
  answers: string[];
  correct_answer: number;
}

// Define the Option component for displaying multiple-choice options
const Option = ({
  choice,
  setUserChoice,
  setOneSelect,
}: {
  choice: string[];
  userChoice: string;
  setUserChoice: React.Dispatch<React.SetStateAction<string>>;
  oneSelect: boolean;
  setOneSelect: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  return (
    <>
      <RadioButtonGroup
        name="doc"
        options={choice}
        value={value}
        width={"100%"}
        onChange={(event) => {
          setUserChoice(event.target.value);
          setOneSelect(true);
          setValue(event.target.value);
        }}
      />
    </>
  );
};

const Questions = () => {
  const [questionNum, setQuestionNum] = useState(0);
  const [data, setData] = useState<Question[] | null>(null);

  const [markedAnswers, setMarkedAnswers] = useState<boolean[]>([]);
  const [userChoice, setUserChoice] = useState("");
  const [oneSelect, setOneSelect] = useState(false);

  const navigate = useNavigate();

  // Fetch the quiz data from a mock API
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/e2d645bc-6ede-47f3-8a20-eeb1298418ea")
      .then((response) => setData(response.data));
  }, []);

  const currentQuestion =
    data && data.length > questionNum ? data[questionNum] : null;

  // Handle the click event for the "Next" button
  const handleNextClick = () => {
    markedAnswers.push(
      userChoice === currentQuestion?.answers[currentQuestion.correct_answer]
    );

    // Check if it's the last question; navigate to the results page if so
    questionNum < 9
      ? setQuestionNum((prevQuestionNum) => prevQuestionNum + 1)
      : navigate("/results", {
          state: markedAnswers,
        });

    setOneSelect(false);
  };

  // Determine the text to display on the button (Next or Submit)
  const buttonText = questionNum < 9 ? "Next" : "Submit";

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
              {/* Render multiple-choice options */}
              <Option
                choice={currentQuestion.answers}
                userChoice={userChoice}
                setUserChoice={setUserChoice}
                oneSelect={oneSelect}
                setOneSelect={setOneSelect}
              />
            </div>
          )}

          <div className="nxtButton">
            {/* Render the "Next" or "Submit" button */}
            <Button
              className="nxtBtn"
              color="#FF3B3C"
              size="large"
              label={buttonText}
              onClick={handleNextClick}
              disabled={!oneSelect}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
