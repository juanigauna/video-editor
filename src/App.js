import { useState } from "react";
import VideoEditor from "./components/VideoEditor";
import { toTimeString } from "./utils";

const App = () => {
  const [videoSrc, setVideoSrc] = useState(null);

  const handleSelectVideo = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setVideoSrc(url);
  };

  const handleSaveVideoData = (event) => {
    console.log(toTimeString(event.target.duration, true));
  };

  return (
    <div className="flex flex-col gap-5 p-5 mx-auto max-w-[600px]">
      <label className="flex items-center justify-center font-semibold bg-gray-100 text-gray-600 rounded p-5">
        Toca para cargar un vídeo
        <input
          type="file"
          accept="video/*"
          onChange={handleSelectVideo}
          hidden
        />
      </label>
      {videoSrc && (
        <VideoEditor
          onVideoLoaded={handleSaveVideoData}
          videoSrc={videoSrc || ""}
        />
      )}
    </div>
  );
};

export default App;
