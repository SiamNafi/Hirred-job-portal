import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "../api/jobsApi";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ApplyJob from "../components/ApplyJob";
import ApplicationCard from "../components/ApplicationCard";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const {
    data: job,
    fn: fnJob,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });

  // fetch for updating hiring status
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  // fetch single job
  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);
  if (!isLoaded || loadingJob)
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center sm:text-center">
        <h1 className="gradient-title font-extrabold pb-3 text-3xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <MapPinIcon />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>
      {/* hiring status */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full p-5 ${
              job?.isOpen ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the Job</h2>
      <p className="sm:text-lg">{job?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown source={job?.requirements} className="sm:text-lg" />
      {/* render applicationz */}
      {job?.recruiter_id !== user?.id && (
        <ApplyJob
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {job?.applications?.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Job;
