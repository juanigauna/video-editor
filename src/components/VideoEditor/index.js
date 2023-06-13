import { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import { toTimeString } from "../../utils";
import RangeVideoSlider from "./RangeVideoSlider";

const ffmpeg = createFFmpeg({
  log: true
});

const defaultOptions = {
  trim: false,
  filters: false,
  rotate: false
};

const OptionButton = ({ optionName, active = false, onActive = () => {} }) => {
  return (
    <button
      className={`${
        active ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
      } rounded px-5 py-2 uppercase text-sm`}
      onClick={onActive}
    >
      {optionName}
    </button>
  );
};

const VideoEditor = ({ videoSrc, onVideoLoaded = () => {} }) => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const [options, setOptions] = useState(defaultOptions);
  const [trimData, setTrimData] = useState({ start: 0, end: 0 });
  const [playingData, setPlayingData] = useState({ start: 0, end: 0 });
  const [data, setData] = useState({
    duration: 0
  });

  const handleSelection = (option) =>
    setOptions({ ...defaultOptions, [option]: !options[option] });

  const videoData = (event) => {
    setData({ duration: event.target.duration });
    setTrimData({ ...trimData, end: event.target.duration });
    setPlayingData({ ...playingData, end: event.target.duration });
  };

  useEffect(() => {
    ffmpeg.load().then(() => setFfmpegLoaded(true));
  }, []);

  if (!ffmpegLoaded)
    return <p className="text-gray-500">Cargando [FFMPEG LIBRARY]...</p>;

  return (
    <section className="flex flex-col gap-2 mx-auto max-w-[600px]">
      <video
        src={videoSrc}
        onLoadedData={(event) => {
          videoData(event);
          onVideoLoaded(event);
        }}
      ></video>

      <div className="flex justify-between">
        <p className="text-gray-500">{toTimeString(playingData.start)}</p>
        <p className="text-gray-500">{toTimeString(playingData.end)}</p>
      </div>

      <div className="flex gap-1">
        <OptionButton
          optionName="Acortar"
          active={options.trim}
          onActive={() => handleSelection("trim")}
        />
        <OptionButton
          optionName="Filtros"
          active={options.filters}
          onActive={() => handleSelection("filters")}
        />
        <OptionButton
          optionName="Rotar"
          active={options.rotate}
          onActive={() => handleSelection("rotate")}
        />
      </div>
      {options.trim && (
        <>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Inicio</p>
              <p className="text-gray-500">{toTimeString(trimData.start)}</p>
            </div>

            <div>
              <p className="text-gray-500 text-right">Final</p>
              <p className="text-gray-500">{toTimeString(trimData.end)}</p>
            </div>
          </div>
          <RangeVideoSlider
            onChange={({ start, end }) => {
              setPlayingData({
                ...playingData,
                end: (data.duration * (end - start)) / 100
              });
              setTrimData({
                start: (start * data.duration) / 100,
                end: (end * data.duration) / 100
              });
            }}
          />
        </>
      )}
    </section>
  );
};

export default VideoEditor;
