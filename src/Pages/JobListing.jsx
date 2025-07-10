import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getJobs } from "../api/jobsApi";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { session, isLoaded } = useSession();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    error: errorJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded)
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;

  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-6xl sm:text-7xl text-center  font-extrabold pb-8">
        Latest Jobs
      </h1>
      {/* add filter here */}
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  savedInit={job?.saved?.length > 0}
                  key={job.id}
                  job={job}
                ></JobCard>
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
