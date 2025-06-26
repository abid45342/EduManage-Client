import React, { useState } from 'react';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

export default function UploadVideo({ cls_id, moduleId }) {
    const axiosPublic = useAxiosPublic();
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  const handleUpload = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'duemajt9d',
        uploadPreset: 'uploadPreset',
        resourceType: 'video',
      },
      async (error, result) => {
        if (!error && result.event === 'success') {
          const videoUrl = result.info.secure_url;
          const newVideo = {
            id: videoId,
            title: videoTitle,
            videoUrl: videoUrl,
          };

          await axiosPublic.patch(`/classs/${cls_id}`, {
            moduleId,
            newVideo,
          });

          alert('Video Uploaded!');
          setVideoId('');
          setVideoTitle('');
        }
      }
    );
    myWidget.open();
  };

  return (
    <div className="p-2">
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Video ID (e.g. w1-3)"
        className="border p-1 mb-1 rounded w-full"
      />
      <input
        type="text"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
        placeholder="Video Title"
        className="border p-1 mb-1 rounded w-full"
      />
      <button onClick={handleUpload} className="px-3 py-1 bg-blue-600 text-white rounded">
        Upload Video
      </button>
    </div>
  );
}













// import React, { useState } from 'react';
// import axios from 'axios';

// export default function UploadVideo({ cls_id, moduleId }) {
//   const [videoId, setVideoId] = useState('');
//   const [videoTitle, setVideoTitle] = useState('');

//   const handleUpload = () => {
//     const myWidget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: 'duemajt9d',
//         uploadPreset: 'uploadPreset',
//         resourceType: 'video',
//       },
//       async (error, result) => {
//         if (!error && result.event === 'success') {
//           const videoUrl = result.info.secure_url;
//           const newVideo = {
//             id: videoId,
//             title: videoTitle,
//             videoUrl: videoUrl,
//           };

//           await axios.patch(`http://localhost:5000/class/${cls_id}/add-video`, {
//             moduleId,
//             newVideo,
//           });

//           alert('Video Uploaded!');
//           setVideoId('');
//           setVideoTitle('');
//         }
//       }
//     );
//     myWidget.open();
//   };

//   return (
//     <div className="p-2">
//       <input
//         type="text"
//         value={videoId}
//         onChange={(e) => setVideoId(e.target.value)}
//         placeholder="Video ID (e.g. w1-3)"
//         className="border p-1 mb-1 rounded w-full"
//       />
//       <input
//         type="text"
//         value={videoTitle}
//         onChange={(e) => setVideoTitle(e.target.value)}
//         placeholder="Video Title"
//         className="border p-1 mb-1 rounded w-full"
//       />
//       <button onClick={handleUpload} className="px-3 py-1 bg-blue-600 text-white rounded">
//         Upload Video
//       </button>
//     </div>
//   );
// }
