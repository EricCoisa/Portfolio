import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from "react-router-dom";
import { getAvailableCompanies } from "./hooks/use-presentation";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Curriculum = lazy(() => import("./pages/Curriculum"));
const Presentation = lazy(() => import("./pages/Presentation"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component to capture URL params for Presentation
const PresentationWrapper = () => {
  const { company } = useParams<{ company?: string }>();
  return <Presentation companyName={company} />;
};

// Component that checks if unknown path is a company name
const CompanyChecker = () => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [companyExists, setCompanyExists] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    const checkCompany = async () => {
      // Extract the path without leading slash
      const pathName = location.pathname.substring(1);
      
      // Skip if it's empty or already a known route
      if (!pathName || pathName === 'curriculum' || pathName === 'resume' || 
          pathName === 'presentation' || pathName.startsWith('presentation/')) {
        setIsChecking(false);
        return;
      }

      try {
        console.log('Verificando se o path é uma empresa:', pathName);
        const companies = await getAvailableCompanies();
        
        // Check if company exists (case-insensitive)
        const foundCompany = companies.find(company => 
          company.name.toLowerCase() === pathName.toLowerCase()
        );

        if (foundCompany) {
          console.log('Empresa encontrada, redirecionando para presentation:', foundCompany.name);
          setCompanyName(foundCompany.name);
          setCompanyExists(true);
        } else {
          console.log('Empresa não encontrada, indo para NotFound');
        }
      } catch (error) {
        console.error('Erro ao verificar empresas:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkCompany();
  }, [location.pathname]);

  // Show loading while checking
  if (isChecking) {
    return <LoadingSpinner />;
  }

  // Redirect to presentation if company exists
  if (companyExists && companyName) {
    return <Navigate to={`/presentation/${companyName}`} replace />;
  }

  // Show NotFound if company doesn't exist
  return <NotFound />;
};

const App = () => (

  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/curriculo" element={<Curriculum />} />
            <Route path="/resume" element={<Curriculum />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/presentation/:company" element={<PresentationWrapper />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<CompanyChecker />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
