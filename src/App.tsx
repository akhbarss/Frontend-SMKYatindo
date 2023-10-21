// import 'aos/dist/aos.css'; // You can also use <link> for styles
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ProviderMantine } from "./components";
import { routeConfigs } from './routes';

function App() {

  return (
    <ProviderMantine>
      <RouterProvider router={routeConfigs} />
    </Provider>
  )
}

export default App;
