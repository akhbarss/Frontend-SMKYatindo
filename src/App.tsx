// import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const Router = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </>
  );
}

export default App;
