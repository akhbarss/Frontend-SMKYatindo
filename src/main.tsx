import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ScrollRestoration from "./utils/ScrollRestoration";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <ScrollRestoration>
        <App />
      </ScrollRestoration>
    </BrowserRouter>
);
