"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const CLOUDINARY_AUDIO_URL = "https://res.cloudinary.com/dg2twu4km/video/upload/v1753559523/My_Miracle_tribzv.mp3";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try autoplay
    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction.");
      }
    };

    tryPlay();
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <audio ref={audioRef} src={CLOUDINARY_AUDIO_URL} loop preload='auto' />
      <Button onClick={togglePlay} variant='outline' className='rounded-full p-2 shadow'>
        {playing ? <Volume2 className='h-5 w-5' /> : <VolumeX className='h-5 w-5' />}
      </Button>
    </div>
  );
}
