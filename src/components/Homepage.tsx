import { Button, Heading } from "grommet";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="container">
        <img src={Logo} /> {/* Display the logo image */}
        <Heading className="title">upraised</Heading>
      </div>

      <div className="circle">
        <Heading size="large" color="#FF3B3C" className="quizHeading">
          Quiz
        </Heading>
      </div>

      <div className="start">
        <Button
          className="startBtn"
          color="#FF3B3C"
          size="large"
          label="Start"
          onClick={() => {
            navigate("/nextPage"); // Navigate to the "/nextPage" route when the button is clicked
          }}
        />
      </div>
    </div>
  );
};

export default Homepage;
