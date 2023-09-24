import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Grommet } from "grommet";
import AppRoutes from "./components/Approutes.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Grommet>
      <AppRoutes />
    </Grommet>
  </BrowserRouter>
);
