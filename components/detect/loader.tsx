import React, { HTMLAttributes } from "react";
import "../../app/loader.css";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className="flex flex-col overflow-y-auto my-16 bg-white text-black dark:text-white dark:bg-background h-full mx-auto justify-center items-center">
      <div className="loader" {...props}>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Loader;
