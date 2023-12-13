function LoadingContactDetails() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-96 h-96 rounded-lg dark:bg-gray-900 bg-gray-300 animate-pulse" />
      <div className="space-y-4 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 border p-5 rounded-lg">
          {[...Array(6).keys()].map((i) => (
            <>
              <div className="dark:bg-gray-900 bg-gray-300 w-20 h-5 rounded-lg animate-pulse" />
              <div className="dark:bg-gray-900 bg-gray-300 w-40 h-5 rounded-lg animate-pulse" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingContactDetails;
