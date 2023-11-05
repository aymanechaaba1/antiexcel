'use client';

import { getFilename, uploadFile } from '@/lib/utils';
import { getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

function useUploadFile({
  avatar,
  fn,
  closeForm,
}: {
  avatar: File | Blob;
  fn: (...values: any) => void;
  closeForm: (...values: any) => void;
}) {
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');

  const uploadTask = uploadFile(`avatars/${getFilename(avatar.name)}`, avatar);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.error(`Upload was unsuccessful. ${error.message}`);
    },
    async () => {
      // Handle successful uploads on complete
      // For instance, get the download URL:
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setDownloadUrl(downloadURL);

      // mutation / fetching / whatever you want 🤷‍♂️
      fn();

      // close form
      closeForm();
    }
  );

  return [progress, downloadUrl];
}

export default useUploadFile;
