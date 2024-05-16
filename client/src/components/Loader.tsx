import React from "react";
import { Audio } from "react-loader-spinner";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Loader() {
  const percentage = 66;

  return (
    <div className="loader">
      <div className="loader_image">
        <CircularProgressbar value={percentage} text={`${percentage}%`} />;
      </div>
    </div>
  );
}
