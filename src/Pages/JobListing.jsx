import { useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { getJobs } from "../api/jobsApi";
import { BarLoader } from "react-spinners";
import JobCard from "../components/JobCard";
import { getCompanies } from "../api/apiCompanies";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";

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
  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
    error: errorCompanies,
  } = useFetch(getCompanies);
  // fetching companies
  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  // fetching jobs
  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  // handle search function
  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
    console.log(searchQuery);
  };

  // clear filters function
  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  console.log(location);

  if (!isLoaded)
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;

  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white text-transparent bg-clip-text text-6xl sm:text-7xl text-center  font-extrabold pb-8">
        Latest Jobs
      </h1>
      {/* add filter here */}

      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder={"Search Jobs By Title"}
          name="search-query"
          className=" flex-1 py-5 text-md "
        />
        <Button
          type="submit"
          className={"py-5 sm:w-28 cursor-pointer"}
          variant={"blue"}
        >
          Search
        </Button>
      </form>
      {/* location filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full p-5">
            <SelectValue placeholder="Filter By Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("BD").map(({ name }) => {
                // const cleanedName = name
                //   .replace(/ District| Division/gi, "")
                //   .trim();

                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="w-full p-5">
            <SelectValue placeholder="Filter By Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant={"red"}
          className={"flex-1 py-5 cursor-pointer"}
        >
          Clear Filters
        </Button>
      </div>
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
