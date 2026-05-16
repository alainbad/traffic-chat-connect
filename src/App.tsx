import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/cashdrop/SplashScreen";
import Onboarding from "./pages/cashdrop/Onboarding";
import SignIn from "./pages/cashdrop/SignIn";
import CustomerHome from "./pages/cashdrop/CustomerHome";
import RequestCash from "./pages/cashdrop/RequestCash";
import PaymentMethod from "./pages/cashdrop/PaymentMethod";
import LiveTracking from "./pages/cashdrop/LiveTracking";
import DeliveryConfirmed from "./pages/cashdrop/DeliveryConfirmed";
import DriverDashboard from "./pages/cashdrop/DriverDashboard";
import DriverDelivery from "./pages/cashdrop/DriverDelivery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/request" element={<RequestCash />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/confirmed" element={<DeliveryConfirmed />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/delivery" element={<DriverDelivery />} />
          <Route path="/traffic" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
