import { Button, Heading } from "grommet";
import Logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

// import u from "../assets/images/u.svg";
// import p from "../assets/images/p.svg";
// import Logo from "../assets/images/r.svg";
// import Logo from "../assets/images/a.svg";
// import Logo from "../assets/images/i.svg";
// import Logo from "../assets/images/s.svg";
// import Logo from "../assets/images/e.svg";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <div className="container">
        <img src={Logo} />
        <Heading>upraised</Heading>
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
            navigate("/nextPage");
          }}
        />
      </div>
    </div>
  );
};

export default Homepage;
