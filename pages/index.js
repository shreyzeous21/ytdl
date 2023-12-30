// pages/index.js
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [videoLink, setVideoLink] = useState("");
  const [finalLink, setFinalLink] = useState();
  const [showDownload, setShowDownload] = useState(false);

  const handleDownload = async () => {
    try {
      const res = await axios.get(
        `/api/downloader?url=${encodeURIComponent(videoLink)}`
      );
      setFinalLink(res.data.format.url);
      setShowDownload(true);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="container mx-auto p-4 bg-black rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
          YouTube Video Downloader
        </h1>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Paste YouTube Video URL"
            className="p-2 border border-gray-300 text-black rounded w-2/3"
          />
          <button
            onClick={handleDownload}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>
        {showDownload && (
          <div className="download-section">
            <h2 className="text-xl font-bold mb-2 items-center justify-center flex">Downloaded Video</h2>
            <video src={finalLink} controls className="w-full max-h-96"></video>
          </div>
        )}
      </div>
    </div>
  );
}
