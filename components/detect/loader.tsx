import React, { HTMLAttributes } from "react";
import "../../app/loader.css";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className="mt-40 flex justify-center items-center">
      <div className="loader" {...props}>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Loader;
