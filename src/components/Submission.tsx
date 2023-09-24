import { useLocation } from "react-router-dom";
import "../Submission.css";
import Correct from "../assets/images/right.svg";
import Incorrect from "../assets/images/wrong.svg";
import { useNavigate } from "react-router-dom";

import { Heading, Meter, Button } from "grommet";

// import GaugeComponent from "react-gauge-component";

const Submission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booleanArray = location.state;

  let correctAnswer = 0;
  let wrongAnswer = 0;

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
        {displayText == "Incorrect" ? (
          <img src={Incorrect} />
        ) : (
          <img src={Correct} />
        )}
        <span>{calcResult}</span>
        <p>{displayText}</p>
      </div>
    </>
  );
}

export default Submission;
