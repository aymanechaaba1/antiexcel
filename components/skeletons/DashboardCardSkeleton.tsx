function DashboardCardSkeleton({ cards = 2 }: { cards?: number }) {
  return (
    <>
      <div className={`w-1/3 h-8 skeleton rounded-lg`} />
      <div className="grid grid-cols-2 gap-4 w-full">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="h-40 rounded-lg skeleton" />
        ))}
      </div>
    </>
  );
}

export default DashboardCardSkeleton;
