'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, Download, List, Video, Youtube } from "lucide-react"

export function YouTubeDownloaderUi() {
  const [url, setUrl] = useState("")
  const [downloadType, setDownloadType] = useState("video")

  const handleDownload = () => {
    alert("This is a UI demo. Actual downloading is not implemented.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <Youtube className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">YouTube Downloader</h1>
          <p className="mt-2 opacity-90">Enter a YouTube URL to download</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-lg font-medium text-gray-700">YouTube URL</Label>
              <Input
                id="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <RadioGroup value={downloadType} onValueChange={setDownloadType} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" className="text-purple-600" />
                <Label htmlFor="video" className="flex items-center space-x-2 cursor-pointer">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span className="text-lg text-gray-700">Single Video</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="playlist" id="playlist" className="text-purple-600" />
                <Label htmlFor="playlist" className="flex items-center space-x-2 cursor-pointer">
                  <List className="w-5 h-5 text-purple-600" />
                  <span className="text-lg text-gray-700">Playlist</span>
                </Label>
              </div>
            </RadioGroup>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download
            </Button>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg" role="alert">
            <div className="flex">
              <AlertCircle className="w-6 h-6 mr-2 flex-shrink-0" />
              <div>
                <p className="font-bold">Legal Disclaimer</p>
                <p className="text-sm">
                  Downloading YouTube videos without permission may violate terms of service and copyright laws.
                  This UI is for demonstration purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}