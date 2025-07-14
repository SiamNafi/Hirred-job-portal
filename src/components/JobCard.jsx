import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Loader, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { deleteJob, saveJob } from "../api/jobsApi";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved });

  const handleSavedJob = async () => {
    await fnSavedJob({
      user_id: user.id, // <-- make sure this is included
      job_id: job.id,
    });
    onJobSaved();
  };

  const { loading: loadingDelete, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDelete = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card>
      {loadingDelete && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle
          className={"flex justify-between items-center text-2xl font-bold"}
        >
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDelete}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job?.description?.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className={"flex gap-2"}>
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant={"secondary"} className={"w-full cursor-pointer"}>
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant={"outline"}
            className={"w-15 cursor-pointer"}
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" cursor={"pointer"} />
            ) : (
              <Heart size={20} cursor={"pointer"} />
            )}
            {loadingSavedJob && <Loader />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
