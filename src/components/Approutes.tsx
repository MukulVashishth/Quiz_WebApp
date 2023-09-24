import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Questions from "./Questions";
import Submission from "./Submission";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Homepage />} />
        <Route path={`/nextPage`} element={<Questions />}></Route>
        <Route path={`/results`} element={<Submission />}></Route>
      </Routes>
    </>
  );
};

export default Approutes;
