import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { RouterProvider } from "react-router-dom";
import { routeConfigs } from './routes';
import { Provider } from "./components"
import "./App.css";

function App() {

  AOS.init();

  return (
    <Provider>
      <RouterProvider router={routeConfigs} />
    </Provider>
  )
}

export default App