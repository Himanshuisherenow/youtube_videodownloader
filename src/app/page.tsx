'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Download, List, Video, Youtube } from 'lucide-react';
import axios from 'axios';

export default function Component() {
  const [url, setUrl] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const [message, setMessage] = useState('');
  const [downloadType, setDownloadType] = useState(''); // Added state for download type (video or playlist)
  const [quality, setQuality] = useState(''); // Added state for video quality

  const handleDownload = async () => {
    if (!url) {
      setMessage('Please provide a video URL.');
      return;
    }

    try {
      const endpoint = downloadType === 'video' ? '/download_video' : '/download_playlist';
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        url,
        downloadPath: downloadPath || '/path/to/default/folder',
        videoQuality: quality, // Include the selected video quality
      }, { responseType: 'blob' });

  
      // Clear input fields after successful download
      setUrl('');
      setDownloadPath('');
      setDownloadType('');
      setQuality('');

      setMessage(`${downloadType === 'video' ? 'Video' : 'Playlist'} downloaded successfully.`);
    } catch (error) {
      setMessage(`Error downloading ${downloadType}: ` + (error.response?.data?.error || error.message));
    }
  };

  const isDownloadDisabled = !url || !downloadType || !quality; // Disable download button until all fields are filled

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 sm:p-12 text-white text-center">
          <Youtube className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">YouTube Downloader</h1>
          <p className="text-xl sm:text-2xl opacity-90">Enter a YouTube URL to download</p>
        </div>
        <div className="p-8 sm:p-12 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4 mb-6">
              <Label htmlFor="url" className="text-2xl font-medium text-gray-700 block">YouTube URL</Label>
              <Input
                id="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full py-7 text-lg sm:text-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
              />
            </div>

            <RadioGroup value={downloadType} onValueChange={setDownloadType} className="space-y-4">
              <div className="flex items-center space-x-4">
                <RadioGroupItem value="video" id="video" className="w-6 h-6 text-purple-600" />
                <Label htmlFor="video" className="flex items-center space-x-3 cursor-pointer">
                  <Video className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl text-gray-700">Single Video</span>
                </Label>
              </div>
              <div className="flex items-center space-x-4">
                <RadioGroupItem value="playlist" id="playlist" className="w-6 h-6 text-purple-600" />
                <Label htmlFor="playlist" className="flex items-center space-x-3 cursor-pointer">
                  <List className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl text-gray-700">Playlist</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-4">
              <Label htmlFor="quality" className="text-2xl font-medium text-gray-700 block">Video Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="w-full py-6 text-lg sm:text-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="144p">144p</SelectItem>
                  <SelectItem value="360p">360p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="1080p">1080p</SelectItem>
                 
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white text-2xl font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleDownload}
              disabled={isDownloadDisabled} // Disable button if conditions are not met
            >
              <Download className="w-8 h-8 mr-3" />
              Download
            </Button>
          </div>
          {message && (
            <div className="mt-6 text-center text-lg text-red-600">
              {message}
            </div>
          )}
          <div className="bg-yellow-100 border-l-8 border-yellow-500 text-yellow-700 p-6 rounded-r-xl" role="alert">
            <div className="flex items-start">
              <AlertCircle className="w-10 h-10 mr-4 flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold mb-2">Legal Disclaimer</p>
                <p className="text-lg">
                  Downloading YouTube videos without permission may violate terms of service and copyright laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
