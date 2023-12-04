'use client';

function StudentsListSkeleton() {
  return (
    <div className="space-y-3 mt-5">
      <h1 className="text-3xl">Students</h1>
      {[...Array(5).keys()].map((key, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border"
        >
          <div className="w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
          <div className="w-32 h-5 rounded-lg bg-gray-500 animate-pulse flex-1"></div>
          <div className="w-16 h-5 rounded-lg bg-gray-500 animate-pulse flex-1"></div>
          <div className="w-10 h-5 rounded-lg bg-gray-500 animate-pulse flex-1"></div>
        </div>
      ))}
    </div>
  );
}

export default StudentsListSkeleton;
