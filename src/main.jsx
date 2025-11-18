import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<p className="center">有地方出了點問題...</p>}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<p className="center">頁面載入中...</p>}>
          <App />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
