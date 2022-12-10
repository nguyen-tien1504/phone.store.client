import React from "react";
import ReactLoading from "react-loading";

const HomeLoading = () => {
  return (
    <div className="flex items-center gap-2">
      <div>
        <ReactLoading type={"spin"} color={"gray"} height={40} width={40} />
      </div>
      <p className="text-2xl">Please Wait</p>
    </div>
  );
};
export default HomeLoading;
