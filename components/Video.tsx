'use client';
import { VIDEO_URL } from '@/lib/config';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

function Video() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(true);
  }, [setShowVideo]);

  return (
    showVideo && (
      <div className="max-w-3xl mx-auto my-5 border rounded-lg shadow-md p-2">
        <ReactPlayer
          url={VIDEO_URL}
          loop={true}
          playing={true}
          muted={true}
          width={`100%`}
          height={`auto`}
        />
      </div>
    )
  );
}

export default Video;
