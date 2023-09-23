import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Questions from "./Questions";

const Approutes = () => {
  return (
    <>
      <Routes>
        <Route path={`/`} element={<Homepage />} />
        <Route path={`/nextPage`} element={<Questions />}></Route>
      </Routes>
    </>
  );
};

export default Approutes;
