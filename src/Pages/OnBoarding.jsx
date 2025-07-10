import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const handleRoleSelection = async (role) => {
    try {
      await user?.update({
        unsafeMetadata: { role },
      });
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user, navigate]);

  if (!isLoaded)
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="bg-gradient-to-br from-gray-500 via-gray-200 to-white bg-clip-text text-transparent font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a....
      </h1>
      <div className="mt-16 grid grid-cols-2 gap-6 w-full md:px-40">
        <Button
          variant={"blue"}
          className={"cursor-pointer h-36 text-2xl"}
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant={"red"}
          className={"cursor-pointer h-36 text-2xl"}
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
