"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AudioPlayer } from "@/components/audio-player";
import { Download, Headphones, Play } from "lucide-react";

type AudioType = "summary" | "transcript" | null;

export const AudioModalButtons = () => {
  const [openModal, setOpenModal] = useState<AudioType>(null);

  const audioConfig = {
    summary: {
      title: "AI-Generated Summary",
      audioSrc: "/audio/summary.mp3",
      downloadFilename: "summary.mp3",
      icon: Headphones,
    },
    transcript: {
      title: "Call Recording",
      audioSrc: "/audio/transcript.mp3",
      downloadFilename: "transcript.mp3",
      icon: Play,
    },
  };

  const handleDownload = (audioSrc: string, filename: string) => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full h-14 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 group flex items-center justify-start"
        onClick={() => setOpenModal("transcript")}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full mr-3 group-hover:bg-blue-700 transition-colors">
          <Play className="h-4 w-4 text-white fill-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-bold">Call Recording</div>
          <div className="text-xs text-blue-600">Full conversation</div>
        </div>
      </Button>
      <Button
        variant="outline"
        className="w-full h-14 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 border-emerald-200 text-emerald-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 group flex items-center justify-start"
        onClick={() => setOpenModal("summary")}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 rounded-full mr-3 group-hover:bg-emerald-700 transition-colors">
          <Headphones className="h-4 w-4 text-white" />
        </div>
        <div className="text-left">
          <div className="text-sm font-bold">Audio Synopsis</div>
          <div className="text-xs text-emerald-600">AI-generated summary</div>
        </div>
      </Button>

      {openModal && (
        <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="sm:max-w-md p-0">
            <DialogHeader className="border-b-[1px] border-gray-300 h-fit p-4">
              <DialogTitle className="flex items-center gap-2">
                {React.createElement(audioConfig[openModal].icon, {
                  className: "w-5 h-5",
                })}
                {audioConfig[openModal].title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 p-4">
              <AudioPlayer src={audioConfig[openModal].audioSrc} />

              <Button
                onClick={() =>
                  handleDownload(
                    audioConfig[openModal].audioSrc,
                    audioConfig[openModal].downloadFilename
                  )
                }
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Download Audio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
