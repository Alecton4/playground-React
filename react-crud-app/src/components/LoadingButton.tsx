import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type LoadingButtonProps = {
  loading: boolean;
  buttonColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  buttonColor = "bg-ct-blue-700",
  textColor = "text-white",
  children,
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `w-full py-3 font-semibold ${buttonColor} rounded-lg outline-none border-none flex justify-center`,
        `${loading && "bg-[#ccc]"}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-white inline-block">Loading...</span>
        </div>
      ) : (
        <span className={`text-lg font-normal ${textColor}`}>{children}</span>
      )}
    </button>
  );
};
