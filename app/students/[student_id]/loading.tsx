import React from 'react';

function LoadingStudentDetails() {
  return (
    <div className="py-4 flex flex-col md:flex-row items-start gap-10">
      <div className="w-96 h-96 rounded-lg dark:bg-gray-900 bg-gray-300 animate-pulse" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 border p-5 rounded-lg">
        {[...Array(10).keys()].map((i) => (
          <>
            <div className="dark:bg-gray-900 bg-gray-300 w-20 h-5 rounded-lg animate-pulse" />
            <div className="dark:bg-gray-900 bg-gray-300 w-40 h-5 rounded-lg animate-pulse" />
          </>
        ))}
      </div>
    </div>
  );
}

export default LoadingStudentDetails;
