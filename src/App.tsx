// import 'aos/dist/aos.css'; // You can also use <link> for styles
import { RouterProvider } from "react-router-dom";
import { Provider } from "./components";
import { routeConfigs } from "./routes";

function App() {
  return (
    <Provider>
      <RouterProvider router={routeConfigs} />
    </Provider>
  );
}

export default App;
