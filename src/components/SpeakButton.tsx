import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeaking, isSpeaking } from '../utils/speech.ts';
import { LanguageCode } from '../i18n/translations.ts';

interface SpeakButtonProps {
  text: string;
  lang: LanguageCode;
  label?: string;
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  lang,
  label = 'Listen',
  className = '',
  iconOnly = false,
  size = 'md',
}) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // If global speech stopped externally
    const interval = setInterval(() => {
      if (playing && !isSpeaking()) {
        setPlaying(false);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [playing]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) {
      stopSpeaking();
      setPlaying(false);
    } else {
      setPlaying(true);
      speakText(text, lang, () => {
        setPlaying(false);
      });
    }
  };

  const iconSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`p-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
          playing
            ? 'bg-teal-700 text-white animate-pulse shadow-sm'
            : 'text-slate-500 hover:text-teal-700 hover:bg-teal-50'
        } ${className}`}
        title={playing ? 'Stop speaking' : `Read aloud in ${lang.toUpperCase()}`}
        aria-label={playing ? 'Stop speaking' : `Read aloud in ${lang.toUpperCase()}`}
      >
        {playing ? <VolumeX className={iconSizeClass} /> : <Volume2 className={iconSizeClass} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 rounded-lg font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${paddingClass} ${
        playing
          ? 'bg-teal-700 text-white shadow-xs animate-pulse'
          : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200'
      } ${className}`}
      title={playing ? 'Stop' : `Listen in ${lang.toUpperCase()}`}
    >
      {playing ? (
        <>
          <VolumeX className={iconSizeClass} />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSizeClass} text-teal-700`} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
