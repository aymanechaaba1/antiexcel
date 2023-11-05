function Section({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-2xl mb-5">{title}</h1>
      {children}
    </div>
  );
}

export default Section;
