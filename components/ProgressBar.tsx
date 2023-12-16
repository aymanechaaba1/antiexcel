'use client';

import { Progress } from '@/components/ui/progress';
import { Dispatch, SetStateAction, useEffect } from 'react';

function ProgressBar({
  progress,
  setProgress,
}: {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  useEffect(() => {
    const timer = setTimeout(() => setProgress(progress), 500);
    return () => clearTimeout(timer);
  }, [progress, setProgress]);

  return <Progress value={progress} className="h-2" />;
}

export default ProgressBar;
