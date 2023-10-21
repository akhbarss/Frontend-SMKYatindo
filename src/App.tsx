import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ProviderMantine } from "./components";
import { routeConfigs } from './routes';

function App() {

  return (
    <ProviderMantine>
      <RouterProvider router={routeConfigs} />
    </ProviderMantine>
  )
}

export default App