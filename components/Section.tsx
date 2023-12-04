function Section({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <p className="text-gray-400">{description}</p>
      {children}
    </div>
  );
}

export default Section;
