import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/authProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import ScrollRestoration from "./utils/ScrollRestoration";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ScrollRestoration>
        <App />
      </ScrollRestoration>
    </BrowserRouter>
  </AuthProvider>
);
