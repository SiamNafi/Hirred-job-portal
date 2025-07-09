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
          element: <OnBoarding />,
        },
        {
          path: "/jobs",
          element: <JobListing />,
        },
        {
          path: "/job/:id",
          element: <Job />,
        },
        {
          path: "/post-job",
          element: <PostJob />,
        },
        {
          path: "/saved-job",
          element: <SavedJobs />,
        },
        {
          path: "/my-jobs",
          element: <MyJobs />,
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
