import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App/App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster position="top-right" />
  </>,
);
