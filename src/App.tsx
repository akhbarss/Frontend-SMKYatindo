// import 'aos/dist/aos.css'; // You can also use <link> for styles
import { RouterProvider, useRoutes } from "react-router-dom";
import { ProviderMantine } from "./components";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Interceptors from "./Interceptor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

const Router = () => {
  return useRoutes(routes);
};

function App() {
  return (
    <Interceptors>
      <QueryClientProvider client={queryClient}>
        <ProviderMantine>
          <Toaster position="top-center" reverseOrder={false} />
          <Router />
        </ProviderMantine>
      </QueryClientProvider>
    </Interceptors>
  );
}

export default App;
