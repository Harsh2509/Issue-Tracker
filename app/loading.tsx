import React from "react";
import Spinner from "./components/Spinner";

const LoadingComponent = () => {
  return (
    <div className="w-[100%] h-[100%] items-center ">
      <Spinner />
    </div>
  );
};

export default LoadingComponent;
