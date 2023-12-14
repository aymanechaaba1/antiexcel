'use client';
import ReactPlayer from 'react-player';

function Video() {
  return (
    <div className="max-w-3xl mx-auto my-5 border rounded-lg shadow-md p-2">
      <ReactPlayer
        url={`https://firebasestorage.googleapis.com/v0/b/school-manager-e26b7.appspot.com/o/edited-demo-antiexcel.mp4?alt=media&token=dfa44346-9bf5-4123-9072-f9cdda2a50a4`}
        loop={true}
        playing={true}
        muted={true}
        width={`100%`}
        height={`auto`}
      />
    </div>
  );
}

export default Video;
