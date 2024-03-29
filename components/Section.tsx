import { cn } from '@/lib/utils';
import React from 'react';

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
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-3xl tracking-tight font-semibold scroll-m-20">
        {title}
      </h1>
      <p className="text-gray-400">{description}</p>
      {children}
    </div>
  );
}

export default Section;
