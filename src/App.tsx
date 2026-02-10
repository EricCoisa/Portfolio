import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from "react-router-dom";
import { getAvailableCompanies } from "./hooks/use-presentation";
import { getAvailableProjects } from "./hooks/use-project";
import { LoadingSpinner } from "./components/ui/loadingSpinner";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Curriculum = lazy(() => import("./pages/Curriculum"));
const Presentation = lazy(() => import("./pages/Presentation"));
const Project = lazy(() => import("./pages/Project"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();


// Wrapper component to capture URL params for Presentation
const PresentationWrapper = () => {
  const { company } = useParams<{ company?: string }>();
  return <Presentation companyName={company} />;
};

// Wrapper component to capture URL params for Project
const ProjectWrapper = () => {
  const { projectName } = useParams<{ projectName?: string }>();
  return <Project projectName={projectName} />;
};

// Wrapper component to capture URL params for Project or project name
const DynamicRouteChecker = () => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const checkRoute = async () => {
      // Extract the path without leading slash
      const pathName = location.pathname.substring(1);
      
      // Skip if it's empty or already a known route
      if (!pathName || 
          pathName === 'curriculum' || 
          pathName === 'resume' || 
          pathName === 'presentation' || 
          pathName === 'project' ||
          pathName.startsWith('presentation/') ||
          pathName.startsWith('project/')) {
        setIsChecking(false);
        return;
      }

      try {
        // Check if it's a company name
        const companies = await getAvailableCompanies();
        const foundCompany = companies.find(company => 
          company.name.toLowerCase() === pathName.toLowerCase()
        );

        if (foundCompany) {
          setRedirectTo(`/presentation/${foundCompany.name}`);
          setIsChecking(false);
          return;
        }

        // Check if it's a project name
        const projects = await getAvailableProjects();
        const foundProject = projects.find(project => 
          project.name.toLowerCase() === pathName.toLowerCase()
        );

        if (foundProject) {
          setRedirectTo(`/project/${foundProject.name}`);
          setIsChecking(false);
          return;
        }

        // Not found
        setIsChecking(false);
      } catch (error) {
        console.error('Erro ao verificar rotas dinâmicas:', error);
        setIsChecking(false);
      }
    };

    checkRoute();
  }, [location.pathname]);

  // Show loading while checking
  if (isChecking) {
    return <LoadingSpinner />;
  }

  // Redirect if found
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  // Show NotFound if nothing matches
  return <NotFound />;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
              <Route path="/project/:projectName" element={<ProjectWrapper />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<DynamicRouteChecker />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
