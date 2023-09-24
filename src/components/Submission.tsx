import { useLocation } from "react-router-dom";
import "../Submission.css";
import Correct from "../assets/images/right.svg";
import Incorrect from "../assets/images/wrong.svg";
import { useNavigate } from "react-router-dom";

import { Heading, Meter, Button } from "grommet";

const Submission = () => {
  const location = useLocation(); // Get the location object from React Router
  const navigate = useNavigate(); // Get the navigation function from React Router
  const booleanArray = location.state; // Extract the markedAnswers array from the Questions component to calculate wrong and
  // right answers.
  let correctAnswer = 0; // Initialize a variable to count correct answers
  let wrongAnswer = 0; // Initialize a variable to count wrong answers

  // Iterate through the booleanArray(markedAnswers) to count correct and wrong answers
  booleanArray.forEach((element: boolean) => {
    if (element == false) {
      wrongAnswer++;
    } else {
      correctAnswer++;
    }
  });
  return (
    <>
      <div className="altCard">
        <div className="newCard">
          <div className="heading">
            <Heading className="testHeading">Your result</Heading>
          </div>

          {/* Displaying the correct and incorrect answers as meter */}
          <div className="meter">
            <Meter
              values={[
                {
                  value: (wrongAnswer / 10) * 100,
                  label: "Incorrect",
                  color: "#FF3B3F",
                },
                {
                  value: (correctAnswer / 10) * 100,
                  color: "#44B77B",
                  label: "correct",
                },
              ]}
              aria-label="meter"
              type="pie"
              size="small"
            />
          </div>

          <div className="results">
            <DisplayResult
              color={"#B1D8B7"}
              calcResult={correctAnswer}
              displayText={"Correct"}
            />
            <DisplayResult
              color={"#FB6B90"}
              calcResult={wrongAnswer}
              displayText={"Incorrect"}
            />
          </div>

          <div className="startAgain">
            <Button
              className="nxtBtn"
              color="#FF3B3C"
              size="large"
              label="Start Again"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

function DisplayResult({
  color,
  calcResult,
  displayText,
}: {
  color: string;
  calcResult: number;
  displayText: string;
}) {
  return (
    <>
      <div
        style={{
          backgroundColor: color,
          display: "flex",
          gap: "5px",
          borderRadius: "4px",
          width: "350px",
          marginBottom: "20px",
        }}
      >
        {displayText == "Incorrect" ? ( // Conditional rendering based on displayText
          <img src={Incorrect} />
        ) : (
          <img src={Correct} />
        )}
        <span className="resultNum">{calcResult}</span>
        <p className="displayText">{displayText}</p>
      </div>
    </>
  );
}

export default Submission;
