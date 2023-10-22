// import 'aos/dist/aos.css'; // You can also use <link> for styles
import { RouterProvider } from "react-router-dom";
import { ProviderMantine } from "./components";
import { routeConfigs } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Interceptors from "./Interceptor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <Interceptors>
      <QueryClientProvider client={queryClient}>
        <ProviderMantine>
          <RouterProvider router={routeConfigs} />
        </ProviderMantine>
      </QueryClientProvider>
    </Interceptors>
  );
}

export default App;
