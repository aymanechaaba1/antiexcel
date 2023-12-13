function StudentsListSkeleton() {
  return (
    <div className="space-y-3 mt-5">
      <h1 className="text-3xl">Students</h1>
      {[...Array(5).keys()].map((key, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border"
        >
          {[...Array(5).keys()].map((i) => (
            <div className="w-20 h-20 rounded-lg bg-gray-900 animate-pulse" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default StudentsListSkeleton;
