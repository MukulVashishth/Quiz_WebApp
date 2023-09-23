import "../Questions.css";
import { Button, RadioButtonGroup, Image } from "grommet";
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

    markedAnswers.push(
      userChoice === currentQuestion?.answers[currentQuestion.correct_answer]
    );
    setOneSelect(false);
    // console.log(markedAnswers);
  };

  console.log(markedAnswers);

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
              <Option
                choice={currentQuestion.answers}
                userChoice={userChoice}
                setUserChoice={setUserChoice}
                oneSelect={oneSelect}
                setOneSelect={setOneSelect}
              />
            </div>
          )}

          {currentQuestion?.image !== null && (
            <img src="https://ibb.co/JKQkLTs" />
          )}
          <div className="nxtButton">
            <Button
              className="nxtBtn"
              color="#FF3B3C"
              size="large"
              label="Next"
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
