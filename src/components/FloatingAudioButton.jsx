import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_SRC = '/GV%20Audio.mp3';

export default function FloatingAudioButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio?.pause();
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasError(false);

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const actionLabel = hasError
    ? 'Audio unavailable. Try again'
    : isPlaying
      ? 'Pause GV Studio audio'
      : 'Play GV Studio audio';

  return (
    <div className="audio-fab-wrap">
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
      />

      <button
        type="button"
        className={`audio-fab${isPlaying ? ' is-playing' : ''}${hasError ? ' has-error' : ''}`}
        aria-label={actionLabel}
        aria-pressed={isPlaying}
        title={actionLabel}
        onClick={toggleAudio}
      >
        {isPlaying ? (
          <Volume2 aria-hidden="true" strokeWidth={2.2} />
        ) : (
          <VolumeX aria-hidden="true" strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}
