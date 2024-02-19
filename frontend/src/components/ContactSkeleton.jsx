import React from "react";

const ContactSkeleton = () => {
  return (
    <div
      role="status"
      className="w-[22em] p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8s dark:border-gray-700 animate-pulse"
    >
      <div class="flex items-center justify-between pb-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-slate-400"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-12"></div>
      </div>
      <div class="flex items-center justify-between pb-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-slate-400"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-12"></div>
      </div>{" "}
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default ContactSkeleton;
