import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AppLayout from "./layout/AppLayout";
import { RouterProvider } from "react-router-dom";
import JobListing from "./Pages/JobListing";
import OnBoarding from "./Pages/OnBoarding";
import Job from "./Pages/Job";
import PostJob from "./Pages/PostJob";
import SavedJobs from "./Pages/SavedJobs";
import MyJobs from "./Pages/MyJobs";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <OnBoarding />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobListing />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <ProtectedRoute>
              <Job />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/post-job",
          element: (
            <ProtectedRoute>
              <PostJob />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/saved-job",
          element: (
            <ProtectedRoute>
              <SavedJobs />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <ProtectedRoute>
              <MyJobs />,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
