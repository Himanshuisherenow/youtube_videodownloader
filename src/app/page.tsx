"use client"

import { useState } from 'react';
import axios from 'axios';

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const [message, setMessage] = useState('');

  const handleDownloadVideo = async () => {
    if (!url) {
      setMessage('Please provide a video URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/download_video', {
        url,
        downloadPath: downloadPath || '/path/to/default/folder'
      }, { responseType: 'blob' });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'downloaded_video.mp4'); // Adjust file name if necessary
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Video downloaded successfully.');
    } catch (error) {
      setMessage('Error downloading video: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDownloadVideos = async () => {
    if (!urls) {
      setMessage('Please provide video URLs.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/download_videos', {
        urls: urls.split(',').map(url => url.trim()),
        downloadPath: downloadPath || '/path/to/default/folder'
      }, { responseType: 'blob' });

      // Handle multiple video files as necessary
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'downloaded_videos.zip'); // Adjust if needed
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Videos downloaded successfully.');
    } catch (error) {
      setMessage('Error downloading videos: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDownloadPlaylist = async () => {
    if (!url) {
      setMessage('Please provide a playlist URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/download_playlist', {
        url,
        downloadPath: downloadPath || '/path/to/default/folder'
      }, { responseType: 'blob' });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'downloaded_playlist.zip'); // Adjust if needed
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage('Playlist downloaded successfully.');
    } catch (error) {
      setMessage('Error downloading playlist: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">YouTube Downloader</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Download Single Video</h2>
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter download path (optional)"
          value={downloadPath}
          onChange={(e) => setDownloadPath(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleDownloadVideo}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Download Video
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Download Multiple Videos</h2>
        <input
          type="text"
          placeholder="Enter YouTube video URLs separated by commas"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter download path (optional)"
          value={downloadPath}
          onChange={(e) => setDownloadPath(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleDownloadVideos}
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          Download Videos
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Download Playlist</h2>
        <input
          type="text"
          placeholder="Enter YouTube playlist URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Enter download path (optional)"
          value={downloadPath}
          onChange={(e) => setDownloadPath(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleDownloadPlaylist}
          className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200"
        >
          Download Playlist
        </button>
      </div>

      {message && (
        <p className="text-center text-lg text-gray-700 mt-6">
          {message}
        </p>
      )}
    </div>
  );
}
