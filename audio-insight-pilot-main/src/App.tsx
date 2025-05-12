
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CallProvider } from "./context/CallContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Calls from "./pages/Calls";
import Upload from "./pages/Upload";
import Reports from "./pages/Reports";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CallProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              } 
            />
            <Route 
              path="/calls" 
              element={
                <Layout>
                  <Calls />
                </Layout>
              } 
            />
            <Route 
              path="/upload" 
              element={
                <Layout>
                  <Upload />
                </Layout>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <Layout>
                  <Reports />
                </Layout>
              } 
            />
            <Route 
              path="/docs" 
              element={
                <Layout>
                  <Documentation />
                </Layout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CallProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
