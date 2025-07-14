import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getSavedJobs } from "../api/jobsApi";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard"; // Assuming you have this component

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: savedJobsLoading,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || savedJobsLoading) {
    return <BarLoader width="100%" className="mb-4" color="#36d7b7" />;
  }

  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-5xl lg:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {savedJobsLoading === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div className="flex items-center justify-center col-span-full min-h-[300px]">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-center">
                No Saved Job 😢
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
