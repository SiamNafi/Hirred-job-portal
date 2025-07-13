import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../components/ui/button";
import { State } from "country-state-city";
import useFetch from "../hooks/useFetch";
import { getCompanies } from "../api/apiCompanies";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { postNewJob } from "../api/jobsApi";
import AddCompanyDrawer from "../components/AddCompanyDrawer";
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  company_id: z.string().min(1, "Company ID is required"),
  requirements: z.string().min(1, "Requirements are required"),
});
const PostJob = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);
  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const {
    error: errorPostJob,
    fn: fnPostJob,
    data: dataPostJob,
    loading: loadingPostJob,
  } = useFetch(postNewJob);

  // submit job post function
  const onSubmit = (data) => {
    fnPostJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  // navigate user after successfull job post
  useEffect(() => {
    if (dataPostJob?.length > 0) navigate("/jobs");
  }, [loadingPostJob]);

  if (!isLoaded || loadingCompanies)
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  if (user?.unsafeMetadata?.role !== "recruiter")
    return <Navigate to={"/jobs"} />;
  return (
    <div>
      <h1 className="bg-gradient-to-br from-gray-600 via-gray-200 to-white bg-clip-text text-transparent sm:text-7xl text-5xl text-center pb-8 font-extrabold">
        Post a Job
      </h1>
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 pb-0"
      >
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        {/* textarea for description */}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex gap-4 items-center">
          {/* render location dropdown */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full p-5">
                  <SelectValue placeholder="Select a Location" />
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
            )}
          />

          {/* render companies dropdown */}
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full p-5">
                  <SelectValue placeholder="Select a Company">
                    {field.value
                      ? companies.find((com) => com.id === Number(field.value))
                          ?.name
                      : "company"}
                  </SelectValue>
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
            )}
          />

          {/* add company drawer */}
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errorPostJob?.message && (
          <p className="text-red-500">{errorPostJob?.message}</p>
        )}
        {loadingPostJob && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button
          disabled={loadingPostJob}
          variant="blue"
          size="lg"
          className="mt-2"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
