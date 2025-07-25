import React, { useEffect } from "react";
import { getApplications } from "../api/apiApplications";
import useFetch from "../hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";

const CreatedApplications = () => {
  const { isLoaded, user } = useUser();
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });
  useEffect(() => {
    if (isLoaded) fnApplications();
  }, [isLoaded]);

  console.log(applications);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;
